"use client"

import state from '@/lib/store';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import React, { useRef } from 'react';
import { useSnapshot } from 'valtio';

const Backdrop = () => {
	const snap = useSnapshot(state);
	const shadows = useRef(null);

	return (
		<AccumulativeShadows
			ref={shadows}
			color={snap.color}
			temporal
			frames={40}
			alphaTest={0.9}
			scale={10}
			rotation={[Math.PI / 2, 0.3, 0]}
			position={[-3, 0, -0.15]}
		>
			<RandomizedLight
				amount={6}
				radius={50}
				intensity={0.99}
				ambient={0.85}
				position={[30, -1, -5]}
			/>
		</AccumulativeShadows>
	);
};

export default Backdrop;
