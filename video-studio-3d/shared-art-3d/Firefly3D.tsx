import React from 'react';
import * as THREE from 'three';

export interface Firefly3DProps {
  f: number;
  fps?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  glow?: number;
  wingsOpen?: number;
  glowColor?: string;
  bodyColor?: string;
  lightIntensity?: number;
}

export const Firefly3D: React.FC<Firefly3DProps> = ({
  f,
  fps = 30,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  glow = 1,
  wingsOpen = 1,
  glowColor = '#ffd166',
  bodyColor = '#5a3a24',
  lightIntensity = 1.1,
}) => {
  const t = f / fps;
  const flap = 0.35 + Math.sin(t * 22) * 0.45;
  const wingAngle = 0.18 + wingsOpen * flap;
  const abdomenGlow = 0.5 + Math.sin(t * 6) * 0.5;
  const intensity = Math.max(0, glow) * lightIntensity;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.04]}>
        <capsuleGeometry args={[0.12, 0.28, 8, 16]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.12} roughness={0.5} clearcoat={0.28} />
      </mesh>

      <mesh position={[0, 0.035, 0.26]}>
        <sphereGeometry args={[0.155, 20, 20]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.08} roughness={0.44} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={`eye-${side}`}>
          <mesh position={[0.084 * side, 0.082, 0.365]}>
            <sphereGeometry args={[0.044, 14, 14]} />
            <meshBasicMaterial color="#090b0f" />
          </mesh>
          <mesh position={[0.096 * side, 0.102, 0.398]}>
            <sphereGeometry args={[0.014, 10, 10]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {[-1, 1].map((side) => (
        <group key={`antenna-${side}`} position={[0.065 * side, 0.135, 0.34]} rotation={[0.5, 0, 0.22 * side]}>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.011, 0.008, 0.24, 8]} />
            <meshStandardMaterial color="#231810" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.025, 10, 10]} />
            <meshBasicMaterial color={glowColor} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, -0.01, -0.33]}>
        <sphereGeometry args={[0.205, 22, 22]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={2.1 + abdomenGlow * 2.2}
          roughness={0.32}
          metalness={0.04}
        />
      </mesh>
      <mesh position={[0, -0.005, -0.33]}>
        <sphereGeometry args={[0.135, 18, 18]} />
        <meshBasicMaterial color="#fff5c4" />
      </mesh>

      <mesh position={[0, -0.01, -0.33]}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.12 * Math.max(0.1, glow)}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -0.01, -0.33]}>
        <sphereGeometry args={[0.74, 20, 20]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.045 * Math.max(0.1, glow)}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={`wing-${side}`} position={[0.14 * side, 0.17, -0.03]} rotation={[0, 0.28 * side, wingAngle * side]}>
          <mesh scale={[0.46, 0.02, 0.23]}>
            <sphereGeometry args={[1, 22, 12]} />
            <meshPhysicalMaterial
              color="#e8ffff"
              transparent
              opacity={0.42}
              roughness={0.12}
              metalness={0.05}
              clearcoat={1}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh scale={[0.39, 0.012, 0.15]} position={[0, 0.005, 0]}>
            <sphereGeometry args={[1, 16, 10]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.26} depthWrite={false} />
          </mesh>
        </group>
      ))}

      {[-0.11, 0, 0.11].map((z, idx) => (
        <group key={`leg-${idx}`} position={[0, -0.1, z]} rotation={[0.2, 0, 0]}>
          {[-1, 1].map((side) => (
            <mesh key={`leg-${idx}-${side}`} position={[0.07 * side, -0.08, 0]} rotation={[0, 0, -0.42 * side]}>
              <cylinderGeometry args={[0.012, 0.009, 0.18, 6]} />
              <meshStandardMaterial color="#24180f" roughness={0.72} />
            </mesh>
          ))}
        </group>
      ))}

      {intensity > 0.02 && (
        <pointLight position={[0, 0, -0.33]} color={glowColor} intensity={intensity} distance={3.6} decay={2} />
      )}
    </group>
  );
};
