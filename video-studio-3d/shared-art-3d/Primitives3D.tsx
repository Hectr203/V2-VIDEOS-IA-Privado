import React, {useLayoutEffect, useMemo, useRef} from 'react';
import * as THREE from 'three';
import {PBR_PRESETS} from './pbrMaterials';

/**
 * Anillo 3D biselado paramétrico con perfil realista de joyería/ingeniería.
 * Soporta recubrimiento parcial/oxidación progresiva (`tarnishRatio` 0..1).
 */
export const BeveledRing3D: React.FC<{
  outerRadius?: number;
  innerRadius?: number;
  bandHeight?: number;
  materialPreset?: keyof typeof PBR_PRESETS;
  tarnishRatio?: number; // 0 = impecable, 1 = completamente oxidado/oscuro
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}> = ({
  outerRadius = 1.18,
  innerRadius = 0.94,
  bandHeight = 0.56,
  materialPreset = 'gold24k',
  tarnishRatio = 0,
  position = [0, 0, 0],
  rotation = [0.45, 0.3, 0],
  scale = 1,
}) => {
  const ringGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: bandHeight,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.045,
      curveSegments: 72,
    });
    geo.center();
    return geo;
  }, [outerRadius, innerRadius, bandHeight]);

  const patchArcGeo = useMemo(() => {
    const remainAngle = Math.max(0.05, (1 - Math.min(0.95, tarnishRatio)) * Math.PI * 1.6);
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerRadius + 0.006, 0, remainAngle, false);
    shape.absarc(0, 0, innerRadius - 0.004, remainAngle, 0, true);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: bandHeight + 0.008,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.046,
      bevelThickness: 0.046,
      curveSegments: 48,
    });
    // Centrar únicamente en Z para conservar el eje concéntrico (0, 0) sobre el anillo base
    geo.translate(0, 0, -(bandHeight + 0.008) / 2);
    return geo;
  }, [outerRadius, innerRadius, bandHeight, tarnishRatio]);

  const matProps = PBR_PRESETS[materialPreset] || PBR_PRESETS.gold24k;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {tarnishRatio <= 0.01 ? (
        <mesh geometry={ringGeo}>
          <meshPhysicalMaterial {...matProps} />
        </mesh>
      ) : (
        <>
          <mesh geometry={ringGeo}>
            <meshPhysicalMaterial {...PBR_PRESETS.tarnishedDark} />
          </mesh>
          {tarnishRatio < 0.96 && (
            <mesh geometry={patchArcGeo}>
              <meshPhysicalMaterial {...matProps} />
            </mesh>
          )}
        </>
      )}
    </group>
  );
};

export interface LayerSpec3D {
  name: string;
  height: number;
  preset: keyof typeof PBR_PRESETS;
}

/**
 * Bloque 3D de corte transversal multicapa (ej. Plata + Barrera de Paladio + Capa de Oro en micras).
 */
export const MicroLayerStack3D: React.FC<{
  width?: number;
  depth?: number;
  layers: LayerSpec3D[];
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({width = 1.35, depth = 1.1, layers, position = [0, 0, 0], rotation = [0.16, -0.28, 0]}) => {
  let cursorY = 0;
  return (
    <group position={position} rotation={rotation}>
      {layers.map((layer, idx) => {
        const h = Math.max(0.02, layer.height);
        const y = cursorY + h / 2;
        cursorY += h;
        const mat = PBR_PRESETS[layer.preset] || PBR_PRESETS.sterlingSilver;
        return (
          <mesh key={`${layer.name}-${idx}`} position={[0, y, 0]}>
            <boxGeometry args={[width, h, depth]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
        );
      })}
    </group>
  );
};

/**
 * Red atómica de alta eficiencia mediante InstancedMesh:
 * Permite animar cientos de átomos depositándose en una rejilla cristalina ('deposit')
 * o infiltrándose hacia arriba a través de un metal sin barrera ('diffuse').
 */
export const AtomicLattice3D: React.FC<{
  f: number;
  fps: number;
  rows?: number;
  cols?: number;
  layersCount?: number;
  spacing?: number;
  atomRadius?: number;
  preset?: keyof typeof PBR_PRESETS;
  mode?: 'deposit' | 'diffuse';
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({
  f,
  fps,
  rows = 8,
  cols = 8,
  layersCount = 2,
  spacing = 0.28,
  atomRadius = 0.125,
  preset = 'gold24k',
  mode = 'deposit',
  position = [0, -0.4, 0],
  rotation = [0.32, 0.25, 0],
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const total = rows * cols * layersCount;
  const t = f / fps;

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let l = 0; l < layersCount; l++) {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = (c - (cols - 1) / 2) * spacing;
          const baseZ = (r - (rows - 1) / 2) * spacing;
          const baseY = l * (spacing * 0.86);

          if (mode === 'deposit') {
            const delay = (l * 0.45) + ((r * 0.06 + c * 0.05) % 0.85);
            const p = Math.min(1, Math.max(0, (t - delay) / 0.55));
            const eased = 1 - Math.pow(1 - p, 3);
            const dropY = baseY + (1 - eased) * 2.6;
            const s = p <= 0 ? 0.001 : 1;
            dummy.position.set(baseX, dropY, baseZ);
            dummy.scale.set(s, s, s);
          } else {
            const phase = (idx * 1.37) % (Math.PI * 2);
            const driftY = baseY + ((t * 0.55 + (idx % 7) * 0.22) % 1.8);
            const driftX = baseX + Math.sin(t * 2.1 + phase) * 0.08;
            dummy.position.set(driftX, driftY, baseZ);
            dummy.scale.set(1, 1, 1);
          }

          dummy.updateMatrix();
          mesh.setMatrixAt(idx, dummy.matrix);
          idx++;
        }
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [f, fps, rows, cols, layersCount, spacing, mode, t]);

  const mat = PBR_PRESETS[preset] || PBR_PRESETS.gold24k;

  return (
    <group position={position} rotation={rotation}>
      {/* Sustrato metálico inferior */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[cols * spacing + 0.4, 0.24, rows * spacing + 0.4]} />
        <meshPhysicalMaterial {...PBR_PRESETS.sterlingSilver} />
      </mesh>
      <instancedMesh ref={meshRef} args={[undefined, undefined, total]}>
        <sphereGeometry args={[atomRadius, 24, 24]} />
        <meshPhysicalMaterial {...mat} />
      </instancedMesh>
    </group>
  );
};

/**
 * Tanque de electrólisis / baño ultrasónico transparente con electrodos y pieza sumergida.
 */
export const ElectrolysisTank3D: React.FC<{
  f: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({f, position = [0, -0.2, 0], rotation = [0.12, -0.22, 0]}) => {
  const tankGeo = useMemo(() => new THREE.BoxGeometry(2.6, 2.3, 1.8), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(tankGeo), [tankGeo]);

  return (
    <group position={position} rotation={rotation}>
      {/* Líquido electrolítico interior */}
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[2.52, 1.82, 1.72]} />
        <meshPhysicalMaterial {...PBR_PRESETS.electrolyteFluid} />
      </mesh>

      {/* Paredes de vidrio y aristas sutiles */}
      <mesh geometry={tankGeo}>
        <meshPhysicalMaterial {...PBR_PRESETS.borosilicateGlass} />
      </mesh>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#64748b" transparent opacity={0.45} />
      </lineSegments>

      {/* Ánodo de oro (+) a la izquierda */}
      <mesh position={[-0.88, 0.05, 0]}>
        <boxGeometry args={[0.1, 1.35, 0.55]} />
        <meshPhysicalMaterial {...PBR_PRESETS.gold24k} />
      </mesh>
      <mesh position={[-0.88, 1.35, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 1.4, 12]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Cátodo (-) y anillo sumergido a la derecha */}
      <mesh position={[0.42, 1.25, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 1.5, 12]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <BeveledRing3D
        outerRadius={0.62}
        innerRadius={0.48}
        bandHeight={0.3}
        materialPreset={f > 45 ? 'gold24k' : 'sterlingSilver'}
        position={[0.42, 0.12 + Math.sin(f * 0.08) * 0.04, 0]}
        rotation={[1.15, f * 0.02, 0.25]}
      />
    </group>
  );
};
