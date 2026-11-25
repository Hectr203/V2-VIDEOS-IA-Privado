import React from 'react';
import {Firefly3D} from './Firefly3D';

export type TeoPose = 'idle' | 'walk' | 'hold_jar' | 'open_jar' | 'look_up' | 'sad';
export type TeoMood = 'curioso' | 'feliz' | 'asombro' | 'triste' | 'decidido';

export interface Teo3DProps {
  f: number;
  fps?: number;
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  pose?: TeoPose;
  mood?: TeoMood;
  mouthOpen?: number;
  lookX?: number;
  lookY?: number;
  blinkSeed?: number;
  showLumi?: boolean;
  lumiRadius?: number;
}

const SKIN = '#d9a471';
const SKIN_SHADE = '#bf8656';
const HAIR = '#2b1e1a';
const JACKET = '#e0a33a';
const JACKET_DARK = '#c48726';
const SCARF = '#2a9d8f';
const SHORTS = '#27344c';
const SHOE = '#d95d39';
const SOLE = '#f3e7d3';
const SATCHEL = '#7a4b2a';
const INK = '#161820';

const Arm: React.FC<{
  side: -1 | 1;
  shoulderX: number;
  shoulderZ: number;
  elbowX: number;
  sleeve: string;
}> = ({side, shoulderX, shoulderZ, elbowX, sleeve}) => (
  <group position={[0.45 * side, 1.82, 0]} rotation={[shoulderX, 0, shoulderZ]}>
    <mesh position={[0, -0.21, 0]}>
      <capsuleGeometry args={[0.103, 0.22, 8, 16]} />
      <meshPhysicalMaterial color={sleeve} roughness={0.58} metalness={0.03} clearcoat={0.12} />
    </mesh>
    <mesh position={[0, -0.11, 0]} rotation={[0, 0, Math.PI / 2]}>
      <torusGeometry args={[0.106, 0.018, 8, 24]} />
      <meshPhysicalMaterial color={JACKET_DARK} roughness={0.6} />
    </mesh>
    <group position={[0, -0.41, 0]} rotation={[elbowX, 0, 0]}>
      <mesh position={[0, -0.18, 0]}>
        <capsuleGeometry args={[0.088, 0.19, 8, 16]} />
        <meshPhysicalMaterial color={sleeve} roughness={0.58} metalness={0.03} clearcoat={0.12} />
      </mesh>
      <mesh position={[0, -0.32, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.092, 0.022, 8, 24]} />
        <meshPhysicalMaterial color={JACKET_DARK} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.39, 0.015]} scale={[1, 1.08, 0.9]}>
        <sphereGeometry args={[0.108, 20, 20]} />
        <meshPhysicalMaterial color={SKIN} roughness={0.52} clearcoat={0.08} />
      </mesh>
      <mesh position={[0.065 * side, -0.38, 0.06]} rotation={[0, 0, 0.5 * side]}>
        <capsuleGeometry args={[0.036, 0.055, 6, 10]} />
        <meshPhysicalMaterial color={SKIN} roughness={0.52} />
      </mesh>
    </group>
  </group>
);

const Leg: React.FC<{
  side: -1 | 1;
  hipX: number;
  kneeX: number;
}> = ({side, hipX, kneeX}) => (
  <group position={[0.215 * side, 1.04, 0]} rotation={[hipX, 0, 0]}>
    <mesh position={[0, -0.25, 0]}>
      <capsuleGeometry args={[0.14, 0.26, 8, 16]} />
      <meshPhysicalMaterial color={SHORTS} roughness={0.62} />
    </mesh>
    <group position={[0, -0.5, 0]} rotation={[kneeX, 0, 0]}>
      <mesh position={[0, -0.25, 0]}>
        <capsuleGeometry args={[0.116, 0.26, 8, 16]} />
        <meshPhysicalMaterial color={SKIN} roughness={0.55} />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 20]} />
        <meshPhysicalMaterial color={SOLE} roughness={0.72} />
      </mesh>
      <group position={[0, -0.47, 0.08]}>
        <mesh>
          <boxGeometry args={[0.235, 0.14, 0.39]} />
          <meshPhysicalMaterial color={SHOE} roughness={0.46} clearcoat={0.4} clearcoatRoughness={0.2} />
        </mesh>
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[0.255, 0.055, 0.42]} />
          <meshPhysicalMaterial color={SOLE} roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.04, 0.13]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.17, 0.035, 0.1]} />
          <meshPhysicalMaterial color="#f8fafc" roughness={0.6} />
        </mesh>
        <mesh position={[0.065 * side, 0.02, 0.04]} rotation={[0, 0, 0.3 * side]}>
          <boxGeometry args={[0.035, 0.07, 0.16]} />
          <meshPhysicalMaterial color="#b3472b" roughness={0.6} />
        </mesh>
      </group>
    </group>
  </group>
);

export const Teo3D: React.FC<Teo3DProps> = ({
  f,
  fps = 30,
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  pose = 'idle',
  mood = 'curioso',
  mouthOpen = 0,
  lookX = 0,
  lookY = 0,
  blinkSeed = 11,
  showLumi = false,
  lumiRadius = 1.05,
}) => {
  const t = f / fps;
  const blink = 1 - 0.88 * Math.pow(Math.max(0, Math.sin((f + blinkSeed) * 0.075)), 28);
  const breath = Math.sin(t * 2.1);
  const headBob = Math.sin(t * 1.7) * 0.012;
  const headLag = Math.sin((t - 0.12) * 1.7) * 0.01;
  const walkPhase = Math.sin(t * 6.2);
  const isWalking = pose === 'walk';

  const headPitch =
    pose === 'sad' ? 0.34 : pose === 'look_up' ? -0.38 : pose === 'hold_jar' ? -0.05 : 0;
  const headYaw = lookX * 0.22;
  const headRoll = Math.sin(t * 0.65) * 0.025 + lookX * 0.04;

  const shoulderXBase =
    pose === 'hold_jar' ? -0.95 : pose === 'open_jar' ? -1.2 : pose === 'look_up' ? 0.08 : pose === 'sad' ? 0.16 : 0.04;
  const elbowBase =
    pose === 'hold_jar' ? -0.62 : pose === 'open_jar' ? -0.24 : pose === 'sad' ? -0.04 : -0.12;
  const shoulderZBase = pose === 'hold_jar' || pose === 'open_jar' ? -0.28 : 0.11;

  const swing = isWalking ? walkPhase * 0.48 : 0;
  const leftShoulderX = shoulderXBase + swing;
  const rightShoulderX = shoulderXBase - swing;
  const leftElbow = elbowBase + (isWalking ? Math.max(0, -walkPhase) * 0.2 : 0);
  const rightElbow = elbowBase + (isWalking ? Math.max(0, walkPhase) * 0.2 : 0);

  const leftHip = isWalking ? -walkPhase * 0.46 : pose === 'sad' ? 0.05 : 0;
  const rightHip = isWalking ? walkPhase * 0.46 : pose === 'sad' ? 0.05 : 0;
  const leftKnee = isWalking ? Math.max(0, walkPhase) * 0.42 : 0.02;
  const rightKnee = isWalking ? Math.max(0, -walkPhase) * 0.42 : 0.02;

  const browTilt = mood === 'triste' ? -0.36 : mood === 'decidido' ? 0.3 : mood === 'asombro' ? -0.08 : 0;
  const browY = mood === 'asombro' ? 0.25 : mood === 'triste' ? 0.18 : 0.215;
  const openAmount = Math.max(0, Math.min(1, mouthOpen));
  const mouthIsOpen = openAmount > 0.16;
  const smileRot = mood === 'triste' ? 0 : Math.PI;
  const smileScale = mood === 'feliz' ? 1.15 : mood === 'decidido' ? 0.75 : 1;

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group position={[0, breath * 0.008, 0]}>
        <Leg side={-1} hipX={leftHip} kneeX={leftKnee} />
        <Leg side={1} hipX={rightHip} kneeX={rightKnee} />

        <mesh position={[0, 1.02, 0]} scale={[1.04, 1, 0.82]}>
          <capsuleGeometry args={[0.36, 0.14, 8, 20]} />
          <meshPhysicalMaterial color={SHORTS} roughness={0.62} />
        </mesh>
        <mesh position={[0, 1.08, 0]} scale={[1.02, 1, 0.82]}>
          <cylinderGeometry args={[0.37, 0.37, 0.075, 28]} />
          <meshPhysicalMaterial color={SATCHEL} roughness={0.66} />
        </mesh>

        <group scale={[1, 1 + breath * 0.008, 1]}>
          <mesh position={[0, 1.48, 0]} scale={[1.02, 1, 0.8]}>
            <capsuleGeometry args={[0.39, 0.34, 12, 24]} />
            <meshPhysicalMaterial color={JACKET} roughness={0.56} metalness={0.03} clearcoat={0.18} clearcoatRoughness={0.5} />
          </mesh>
          <mesh position={[0, 1.23, 0.36]}>
            <boxGeometry args={[0.025, 0.52, 0.018]} />
            <meshPhysicalMaterial color={JACKET_DARK} roughness={0.6} />
          </mesh>
          <mesh position={[0.17, 1.26, 0.4]}>
            <boxGeometry args={[0.2, 0.12, 0.018]} />
            <meshPhysicalMaterial color={JACKET_DARK} roughness={0.64} />
          </mesh>
          <mesh position={[0.17, 1.3, 0.41]}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <meshBasicMaterial color="#f8e7b1" />
          </mesh>
          <mesh position={[-0.2, 1.67, 0.39]}>
            <sphereGeometry args={[0.062, 18, 18]} />
            <meshStandardMaterial color="#ffe28a" emissive="#ffc247" emissiveIntensity={2.2} roughness={0.3} />
          </mesh>
          <mesh position={[-0.2, 1.67, 0.4]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.11, 0.11, 0.02]} />
            <meshStandardMaterial color="#ffd166" emissive="#ffb703" emissiveIntensity={1.4} roughness={0.4} />
          </mesh>

          <mesh position={[0, 1.96, -0.28]} scale={[1.1, 0.72, 0.55]}>
            <sphereGeometry args={[0.3, 20, 16]} />
            <meshPhysicalMaterial color={JACKET_DARK} roughness={0.66} />
          </mesh>

          <mesh position={[0, 1.98, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.285, 0.092, 10, 36]} />
            <meshPhysicalMaterial color={SCARF} roughness={0.7} metalness={0.02} />
          </mesh>
          <mesh position={[0.23, 1.82, 0.22]} rotation={[0.18, 0, -0.32]}>
            <capsuleGeometry args={[0.09, 0.23, 6, 14]} />
            <meshPhysicalMaterial color={SCARF} roughness={0.7} />
          </mesh>
          <mesh position={[0.3, 1.68, 0.2]} rotation={[0.15, 0, 0.12]}>
            <capsuleGeometry args={[0.07, 0.13, 6, 12]} />
            <meshPhysicalMaterial color="#228176" roughness={0.72} />
          </mesh>

          <mesh position={[0, 2.03, 0]}>
            <cylinderGeometry args={[0.135, 0.15, 0.2, 20]} />
            <meshPhysicalMaterial color={SKIN} roughness={0.54} />
          </mesh>

          <group position={[-0.47, 1.2, 0.06]} rotation={[0, 0.16, -0.08]}>
            <mesh>
              <boxGeometry args={[0.28, 0.24, 0.16]} />
              <meshPhysicalMaterial color={SATCHEL} roughness={0.62} clearcoat={0.18} />
            </mesh>
            <mesh position={[0, 0.08, 0.01]}>
              <boxGeometry args={[0.285, 0.1, 0.17]} />
              <meshPhysicalMaterial color="#94613a" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.045, 0.095]}>
              <boxGeometry args={[0.05, 0.04, 0.025]} />
              <meshStandardMaterial color="#e6b85c" metalness={0.6} roughness={0.3} />
            </mesh>
          </group>
          <mesh position={[0, 1.58, 0.35]} rotation={[0.12, 0, 0.58]}>
            <boxGeometry args={[0.055, 0.9, 0.03]} />
            <meshPhysicalMaterial color={SATCHEL} roughness={0.66} />
          </mesh>

          <Arm
            side={-1}
            shoulderX={leftShoulderX}
            shoulderZ={-shoulderZBase}
            elbowX={leftElbow}
            sleeve={JACKET}
          />
          <Arm
            side={1}
            shoulderX={rightShoulderX}
            shoulderZ={shoulderZBase}
            elbowX={rightElbow}
            sleeve={JACKET}
          />

          <group position={[0, 2.55 + headBob + headLag, 0]} rotation={[headPitch, headYaw, headRoll]} scale={0.96}>
            <mesh position={[0, 0, -0.02]} scale={[1.03, 0.9, 0.97]}>
              <sphereGeometry args={[0.64, 32, 32]} />
              <meshPhysicalMaterial color={SKIN} roughness={0.52} clearcoat={0.08} clearcoatRoughness={0.6} />
            </mesh>

            {[-1, 1].map((side) => (
              <mesh key={`ear-${side}`} position={[0.64 * side, 0, -0.02]} scale={[0.55, 1, 0.8]}>
                <sphereGeometry args={[0.14, 18, 18]} />
                <meshPhysicalMaterial color={SKIN} roughness={0.54} />
              </mesh>
            ))}

            <mesh position={[0, 0.105, -0.1]} scale={[1.02, 0.82, 1.01]}>
              <sphereGeometry args={[0.66, 32, 32]} />
              <meshPhysicalMaterial color={HAIR} roughness={0.58} clearcoat={0.2} clearcoatRoughness={0.4} />
            </mesh>
            {[-0.3, -0.02, 0.28].map((x, idx) => (
              <mesh key={`fringe-${idx}`} position={[x, 0.335, 0.52]} scale={[1.25, 0.8, 0.72]}>
                <sphereGeometry args={[0.155, 20, 16]} />
                <meshPhysicalMaterial color={HAIR} roughness={0.58} clearcoat={0.2} />
              </mesh>
            ))}
            {[-1, 1].map((side) => (
              <mesh key={`sideburn-${side}`} position={[0.575 * side, -0.08, 0.19]} scale={[0.55, 1.2, 0.7]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshPhysicalMaterial color={HAIR} roughness={0.6} />
              </mesh>
            ))}

            <mesh position={[0, 0.345, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.9]}>
              <torusGeometry args={[0.62, 0.028, 8, 48]} />
              <meshPhysicalMaterial color="#8a5a28" roughness={0.55} metalness={0.25} />
            </mesh>
            {[-1, 1].map((side) => (
              <group key={`goggle-${side}`} position={[0.215 * side, 0.36, 0.56]} rotation={[-0.24, 0.12 * side, 0]}>
                <mesh>
                  <torusGeometry args={[0.135, 0.03, 10, 32]} />
                  <meshStandardMaterial color="#c98b2e" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[0, 0, 0.012]}>
                  <circleGeometry args={[0.115, 32]} />
                  <meshPhysicalMaterial color="#ffcf5c" transparent opacity={0.18} roughness={0.08} metalness={0.1} clearcoat={1} side={2} />
                </mesh>
              </group>
            ))}

            {[-1, 1].map((side) => (
              <group key={`eye-${side}`}>
                <mesh
                  position={[0.228 * side + lookX * 0.028, 0.015 + lookY * 0.018, 0.595]}
                  scale={[1, 1.1 * (0.12 + 0.88 * blink), 0.58]}
                >
                  <sphereGeometry args={[0.1, 22, 22]} />
                  <meshPhysicalMaterial color={INK} roughness={0.2} metalness={0.05} clearcoat={0.9} />
                </mesh>
                <mesh position={[0.255 * side + lookX * 0.028, 0.058 + lookY * 0.018, 0.652]} scale={[1, 0.9 * blink + 0.1, 0.5]}>
                  <sphereGeometry args={[0.024, 14, 14]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            ))}

            {[-1, 1].map((side) => (
              <mesh
                key={`brow-${side}`}
                position={[0.23 * side, browY, 0.615]}
                rotation={[0, 0, -side * browTilt]}
              >
                <capsuleGeometry args={[0.022, 0.105, 6, 10]} />
                <meshPhysicalMaterial color={HAIR} roughness={0.62} />
              </mesh>
            ))}

            <mesh position={[0, -0.06, 0.638]}>
              <sphereGeometry args={[0.052, 16, 16]} />
              <meshPhysicalMaterial color={SKIN_SHADE} roughness={0.56} />
            </mesh>

            {mouthIsOpen ? (
              <group position={[0, -0.2, 0.6]}>
                <mesh scale={[1, 0.95 * openAmount + 0.22, 0.5]}>
                  <sphereGeometry args={[0.07, 18, 18]} />
                  <meshPhysicalMaterial color="#5b1f2a" roughness={0.5} />
                </mesh>
                <mesh position={[0, -0.035 * openAmount, 0.018]} scale={[1.15, 0.65, 0.55]}>
                  <sphereGeometry args={[0.04, 14, 14]} />
                  <meshPhysicalMaterial color="#c45a62" roughness={0.6} />
                </mesh>
              </group>
            ) : mood === 'decidido' ? (
              <mesh position={[0, -0.18, 0.61]} scale={[1, 0.55, 0.5]}>
                <capsuleGeometry args={[0.018, 0.075, 6, 10]} />
                <meshPhysicalMaterial color="#5b2c2a" roughness={0.6} />
              </mesh>
            ) : (
              <mesh position={[0, -0.17, 0.6]} rotation={[0, 0, smileRot]} scale={[smileScale, 0.78, 0.6]}>
                <torusGeometry args={[0.073, 0.013, 8, 24, Math.PI]} />
                <meshPhysicalMaterial color="#6b2b2e" roughness={0.55} />
              </mesh>
            )}

            {[-1, 1].map((side) => (
              <mesh key={`cheek-${side}`} position={[0.41 * side, -0.09, 0.535]} scale={[1, 0.6, 0.32]}>
                <sphereGeometry args={[0.095, 16, 16]} />
                <meshBasicMaterial color="#e88c86" transparent opacity={0.3} depthWrite={false} />
              </mesh>
            ))}
            {[-1, 1].map((side) =>
              [-0.035, 0, 0.035].map((offset, idx) => (
                <mesh key={`freckle-${side}-${idx}`} position={[0.33 * side + offset, -0.045 + Math.abs(offset) * 0.4, 0.6]}>
                  <sphereGeometry args={[0.011, 8, 8]} />
                  <meshBasicMaterial color="#b97852" />
                </mesh>
              ))
            )}
          </group>
        </group>
      </group>

      {showLumi && (
        <Firefly3D
          f={f}
          fps={fps}
          scale={0.48}
          glow={1}
          wingsOpen={1}
          position={[
            Math.cos(t * 0.92) * lumiRadius,
            2.72 + Math.sin(t * 1.7) * 0.12,
            Math.sin(t * 0.92) * lumiRadius * 0.55 + 0.24,
          ]}
          rotation={[0, -t * 0.92 + Math.PI / 2, 0]}
          lightIntensity={0.85}
        />
      )}
    </group>
  );
};
