/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 memory_card.glb
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

export function MemoryCard({ position, startAnimation, ...props }) {
  const { nodes, materials } = useGLTF('models/memory_card.glb');
  const ref = useRef();

  useFrame(() => {
    if (ref.current.scale.x <= 1.5) {
      const lerpValue = MathUtils.lerp(ref.current.scale.x, 1.2, 0.04);
      ref.current.scale.set(lerpValue, lerpValue, lerpValue);
    }

    if (startAnimation) {
      ref.current.position.z = MathUtils.lerp(ref.current.position.z, 100, 0.002);
      ref.current.position.y = MathUtils.lerp(ref.current.position.y, -1, 0.01);
      ref.current.position.x = MathUtils.lerp(ref.current.position.x, 0, .055);

      ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, -7, 0.009);
      ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, 3, 0.0007);
      ref.current.rotation.z = MathUtils.lerp(ref.current.position.z, -5, 0.78);
    }
  });

  return (
    <group
      dispose={null}
      ref={ref}
      position={position}
      scale={0}
      rotation-x={-0.4}
      {...props}
    >
      <mesh geometry={nodes.Memory_card.geometry} material={materials['07 - Default']} rotation={[Math.PI / 2, 0, 0]} scale={0.02} />
    </group>
  );
}

useGLTF.preload('/models/memory_card.glb');
