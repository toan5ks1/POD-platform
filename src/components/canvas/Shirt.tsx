"use client"

import state from '@/lib/store';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React from 'react';
import { useSnapshot } from 'valtio';
import type * as THREE from 'three'
import { type GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh
  }
  materials: {
    lambert1: THREE.MeshStandardMaterial
  }
}

const Shirt = () => {
	const { nodes, materials } = useGLTF('../../../model/shirt_baked.glb') as GLTFResult;
	const snap = useSnapshot(state);

	const logoTexture = useTexture(snap.logoDecal);
	const fullTexture = useTexture(snap.fullDecal);
	const stateString = JSON.stringify(snap);

	useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

	return (
		<>
			<group key={stateString}>
				<mesh
					castShadow
					geometry={nodes.T_Shirt_male.geometry}
					material={materials.lambert1}
					material-roughness={1}
					dispose={null}
				>
					{snap.isFullTexture && (
						<Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
					)}
					{snap.isLogoTexture && (
						<Decal
							position={[0, 0.04, 0.15]}
							rotation={[0, 0, 0]}
							scale={0.15}
							map={logoTexture}
							depthTest={false}
							// depthWrite={true}
						/>
					)}
				</mesh>
			</group>
		</>
	);
};

export default Shirt;
