import React, {useEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Crea un domo de estudio fotográfico procedural con paneles softbox de alto brillo
 * para generar reflejos metálicos sedosos estilo comercial de joyería/Apple 100% en memoria
 * y de forma síncrona (disponible desde el frame 0 sin descargas HDR remotas).
 */
function buildStudioSoftboxEnv(gl: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
  const pmrem = new THREE.PMREMGenerator(gl);
  pmrem.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color('#2a2826');

  const panelGeo = new THREE.PlaneGeometry(1, 1);

  const addSoftbox = (
    pos: [number, number, number],
    rot: [number, number, number],
    scale: [number, number],
    hex: string,
    mult: number
  ) => {
    const color = new THREE.Color(hex).multiplyScalar(mult);
    const mat = new THREE.MeshBasicMaterial({color, side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(panelGeo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.scale.set(scale[0], scale[1], 1);
    envScene.add(mesh);
  };

  // Softbox cenital principal (brillo superior en biseles y anillos)
  addSoftbox([0, 7.5, 1], [Math.PI / 2, 0, 0], [14, 10], '#fffaf0', 3.4);
  // Softbox frontal derecho cálido (cara frontal de bloques y metales)
  addSoftbox([6.5, 2.2, 6.0], [0, -Math.PI * 0.25, 0], [9, 10], '#fff3d6', 2.8);
  // Softbox frontal izquierdo blanco neutro (contraste espejo plateado)
  addSoftbox([-6.8, 1.8, 5.5], [0, Math.PI * 0.28, 0], [9, 10], '#f0f7ff', 2.6);
  // Panel de relleno frontal amplio (ilumina caras frontales planas en cortes microscópicos)
  addSoftbox([0, 0.5, 9.5], [0, Math.PI, 0], [14, 9], '#ffffff', 1.75);
  // Borde trasero dorado suave (rim-light cálido)
  addSoftbox([0, 3.0, -8.0], [0, 0, 0], [14, 8], '#fde68a', 2.2);
  // Rebote inferior suave (para que la parte baja de los anillos y esferas nunca quede negra)
  addSoftbox([0, -7.0, 2.0], [-Math.PI / 2, 0, 0], [14, 12], '#e5d5b7', 1.35);

  const envRT = pmrem.fromScene(envScene, 0.03);
  pmrem.dispose();
  panelGeo.dispose();
  return envRT;
}

const ProceduralStudioEnvironment: React.FC<{
  camPos: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}> = ({camPos, lookAt, fov}) => {
  const {gl, scene, camera} = useThree();

  // Construcción síncrona en useMemo para que el frame 0 en render headless ya tenga reflejos PBR
  const envRT = useMemo(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.24;
    return buildStudioSoftboxEnv(gl);
  }, [gl]);

  scene.environment = envRT.texture;

  useEffect(() => {
    return () => {
      if (scene.environment === envRT.texture) {
        scene.environment = null;
      }
      envRT.dispose();
    };
  }, [scene, envRT]);

  if (camera instanceof THREE.PerspectiveCamera) {
    camera.position.set(camPos[0], camPos[1], camPos[2]);
    camera.fov = fov;
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    camera.updateProjectionMatrix();
  }

  return (
    <>
      <hemisphereLight args={['#fffaf0', '#3b3228', 0.95]} />
      <directionalLight position={[4.5, 6.0, 6.5]} intensity={2.6} color="#fff7e6" />
      <directionalLight position={[-5.5, 3.5, 4.5]} intensity={1.7} color="#e0f2fe" />
      <directionalLight position={[0, -3.5, 5.5]} intensity={1.1} color="#fef3c7" />
      <pointLight position={[0, 2.5, 4.0]} intensity={1.4} color="#ffffff" />
    </>
  );
};

export interface StudioStage3DProps {
  width: number;
  height: number;
  cameraPosition?: [number, number, number];
  cameraLookAt?: [number, number, number];
  fov?: number;
  bgGlowColor?: string;
  bgGlowOpacity?: number;
  children: React.ReactNode;
}

/**
 * Escenario 3D PBR de estudio sobre fondo obsidiana (#050507) con halo cálido posterior
 * e iluminación física determinista cuadro a cuadro.
 */
export const StudioStage3D: React.FC<StudioStage3DProps> = ({
  width,
  height,
  cameraPosition = [0, 1.4, 5.8],
  cameraLookAt = [0, 0, 0],
  fov = 38,
  bgGlowColor = '#d97706',
  bgGlowOpacity = 0.2,
  children,
}) => {
  return (
    <div style={{position: 'absolute', inset: 0, background: '#050507', overflow: 'hidden'}}>
      {/* Halo atmosférico suave detrás del objeto héroe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${bgGlowColor} 0%, transparent 58%)`,
          opacity: bgGlowOpacity,
          pointerEvents: 'none',
        }}
      />

      <ThreeCanvas
        width={width}
        height={height}
        camera={{position: cameraPosition, fov, near: 0.1, far: 100}}
        gl={{antialias: true, alpha: true}}
      >
        <ProceduralStudioEnvironment camPos={cameraPosition} lookAt={cameraLookAt} fov={fov} />
        {children}
      </ThreeCanvas>
    </div>
  );
};
