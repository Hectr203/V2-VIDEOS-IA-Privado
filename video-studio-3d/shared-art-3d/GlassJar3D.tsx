import React from 'react';
import * as THREE from 'three';

export interface GlassJar3DProps {
  f: number;
  fps?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  open?: boolean;
  glow?: number;
  glowColor?: string;
  lightIntensity?: number;
}

export const GlassJar3D: React.FC<GlassJar3DProps> = ({
  f,
  fps = 30,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  open = false,
  glow = 0,
  glowColor = '#ffd166',
  lightIntensity = 0.9,
}) => {
  const t = f / fps;
  const pulse = 0.55 + Math.sin(t * 5.4) * 0.45;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.315, 0.315, 0.035, 40]} />
        <meshPhysicalMaterial
          color="#d9f2ff"
          transparent
          opacity={0.34}
          roughness={0.05}
          metalness={0.02}
          clearcoat={1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.7, 44, 1, true]} />
        <meshPhysicalMaterial
          color="#d6f0ff"
          transparent
          opacity={0.3}
          roughness={0.04}
          metalness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.03}
          side={THREE.DoubleSide}
          depthWrite={false}
          envMapIntensity={2.8}
        />
      </mesh>

      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.317, 0.03, 10, 44]} />
        <meshPhysicalMaterial color="#eaf8ff" metalness={0.6} roughness={0.18} clearcoat={0.7} />
      </mesh>

      <mesh position={[0, -0.345, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.317, 0.027, 10, 44]} />
        <meshPhysicalMaterial color="#d8eaf5" metalness={0.55} roughness={0.22} />
      </mesh>

      <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.323, 0.013, 8, 44]} />
        <meshPhysicalMaterial color="#9b6b3f" roughness={0.8} />
      </mesh>
      <mesh position={[-0.25, 0.02, 0.14]} rotation={[0.1, 0.35, -0.15]}>
        <boxGeometry args={[0.075, 0.13, 0.012]} />
        <meshPhysicalMaterial color="#d8c39a" roughness={0.85} />
      </mesh>

      {!open && (
        <group position={[0, 0.48, 0]}>
          <mesh>
            <cylinderGeometry args={[0.338, 0.338, 0.095, 36]} />
            <meshPhysicalMaterial color="#b98a4a" metalness={0.78} roughness={0.28} clearcoat={0.45} />
          </mesh>
          <mesh position={[0, 0.065, 0]}>
            <cylinderGeometry args={[0.29, 0.33, 0.045, 36]} />
            <meshPhysicalMaterial color="#d0a35c" metalness={0.8} roughness={0.24} />
          </mesh>
          <mesh position={[0, 0.115, 0]}>
            <sphereGeometry args={[0.065, 18, 18]} />
            <meshPhysicalMaterial color="#caa05c" metalness={0.78} roughness={0.25} />
          </mesh>
        </group>
      )}

      {!open && (
        <mesh position={[0, 0.425, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.31, 0.014, 8, 40]} />
          <meshPhysicalMaterial color="#7a5232" roughness={0.72} />
        </mesh>
      )}

      {glow > 0.01 && (
        <>
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.3, 18, 18]} />
            <meshBasicMaterial
              color={glowColor}
              transparent
              opacity={0.16 * glow * (0.65 + pulse * 0.35)}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <pointLight position={[0, -0.02, 0]} color={glowColor} intensity={lightIntensity * glow} distance={3.2} decay={2} />
        </>
      )}

      <mesh position={[0.14, 0.02, 0.29]} rotation={[0.1, 0.2, 0]}>
        <boxGeometry args={[0.035, 0.5, 0.008]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.42} depthWrite={false} />
      </mesh>
      <mesh position={[-0.19, -0.06, 0.26]} rotation={[0.05, -0.15, 0]}>
        <boxGeometry args={[0.018, 0.28, 0.006]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <mesh position={[0.24, -0.12, 0.2]} rotation={[0.08, -0.32, 0]}>
        <boxGeometry args={[0.012, 0.17, 0.006]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.26} depthWrite={false} />
      </mesh>
    </group>
  );
};
