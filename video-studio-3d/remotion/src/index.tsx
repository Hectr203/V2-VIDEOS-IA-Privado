import React from 'react';
import {AbsoluteFill, Composition, registerRoot, useCurrentFrame, useVideoConfig} from 'remotion';
import {BeveledRing3D, SatinMetricPill3D, StudioStage3D} from '../../shared-art-3d';

const Studio3DShowcase: React.FC = () => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill>
      <StudioStage3D width={width} height={height} cameraPosition={[0, 1.2, 4.8]}>
        <BeveledRing3D rotation={[0.5, f * 0.03, 0.2]} materialPreset="gold24k" />
      </StudioStage3D>
      <SatinMetricPill3D f={f} xPercent={50} yPercent={82} text="VIDEO STUDIO 3D · PBR ENGINE" variant="gold" />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <Composition id="Studio3DShowcase" component={Studio3DShowcase} durationInFrames={90} fps={30} width={1080} height={1920} />
);

registerRoot(RemotionRoot);
