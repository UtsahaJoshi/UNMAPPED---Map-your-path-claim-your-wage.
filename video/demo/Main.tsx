import React from 'react';
import {
	AbsoluteFill,
	Series,
	Video,
	Audio,
	staticFile,
	interpolate,
	useCurrentFrame,
} from 'remotion';
import { FinalScene } from './scenes/FinalScene';

const Captions: React.FC<{ text: string }> = ({ text }) => {
	return (
		<div
			style={{
				position: 'absolute',
				bottom: 50,
				width: '100%',
				textAlign: 'center',
				padding: '0 40px',
			}}
		>
			<span
				style={{
					background: 'rgba(10, 31, 61, 0.85)',
					color: '#F5F1E8',
					padding: '10px 20px',
					borderRadius: 12,
					fontSize: 28,
					fontFamily: 'Inter, sans-serif',
					fontWeight: 600,
					boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
				}}
			>
				{text}
			</span>
		</div>
	);
};

export const Main: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill style={{ backgroundColor: '#F5F1E8' }}>
			<Series>
				{/* Scene 1: Discovery */}
				<Series.Sequence durationInFrames={420}>
					<Video src={staticFile('demo_assets/1.mp4')} />
					<Audio src={staticFile('demo_audio/d01.mp3')} />
					<Captions text="Nepal's Strategic Goal: $100B GDP & $3,000 Per Capita." />
				</Series.Sequence>

				{/* Scene 2: Logic Bridge */}
				<Series.Sequence durationInFrames={420}>
					<Video src={staticFile('demo_assets/2.mp4')} />
					<Audio src={staticFile('demo_audio/d02.mp3')} />
					<Captions text="Mapping the Informal Sector to Capture Real-World Data." />
				</Series.Sequence>

				{/* Scene 3: Skill Gap */}
				<Series.Sequence durationInFrames={480}>
					<Video src={staticFile('demo_assets/3.mp4')} />
					<Audio src={staticFile('demo_audio/d03.mp3')} />
					<Captions text="Closing the Gap: Targeted Training for Economic Growth." />
				</Series.Sequence>

				{/* Scene 4: Final Motion Graphics */}
				<Series.Sequence durationInFrames={480}>
					<FinalScene />
					<Audio src={staticFile('demo_audio/d04.mp3')} />
				</Series.Sequence>
			</Series>

			{/* Static Watermark */}
			<div
				style={{
					position: 'absolute',
					top: 40,
					right: 40,
					backgroundColor: '#0A1F3D',
					color: '#F5F1E8',
					padding: '8px 16px',
					borderRadius: 8,
					fontSize: 20,
					fontWeight: 900,
					fontFamily: 'Inter',
					letterSpacing: -1,
				}}
			>
				UNMAPPED
			</div>
		</AbsoluteFill>
	);
};
