/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 ethereum_logo.glb
Author: alex.yefremov (https://sketchfab.com/alex.yefremov)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/ethereum-logo-103abec3ee9045858db28a7657fe2e18
Title: Ethereum logo
*/

import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

const MARGIN = .015;

export function Ethereum({ shouldRotate, getRef, animationCallback, targetScale, loadAnimation, shrink, ...props }) {
  const ref = useRef();
  const [isLoadingAnimationFinished, setIsLoadingAnimationFinished] = useState(null);
  const [shrinkAnimation, setShrinkAnimation] = useState(false);

  useFrame(({ clock }) => {
    if (shouldRotate) {
      const t = clock.getElapsedTime();
      ref.current.rotation.z = t;
    }

    if (isLoadingAnimationFinished === false) {
      if (ref.current.scale.x <= targetScale - MARGIN) {
        const lerpValue = MathUtils.lerp(ref.current.scale.x, targetScale, 0.021);
        ref.current.scale.set(lerpValue, lerpValue, lerpValue);
      } else {
        if (animationCallback) animationCallback(); // tell parent component animation is finished
        setIsLoadingAnimationFinished(true);
      }
    }

    if (shrinkAnimation === true) {
      const lerpValue = MathUtils.lerp(ref.current.scale.x, -0.02, 0.25);
      ref.current.scale.set(lerpValue, lerpValue, lerpValue);
    }

  });

  const startLoadingAnimation = () => {
    setIsLoadingAnimationFinished(false);
  };

  useEffect(() => {
    if (getRef) {
      getRef(ref);
    }

    if (loadAnimation) {
      loadAnimation(ref);
    }

    if (shrink) {
      shrink(ref);
    }
  }, []);
  const { nodes, materials } = useGLTF('/models/ethereum_logo.glb');
  console.log(materials);
  return (
    <group
      ref={ref}
      dispose={null}
      scale={0}
      {...props}
      startLoadingAnimation={startLoadingAnimation}
      triggerShrinkAnimation={() => { setShrinkAnimation(true); }}
    >
      <group scale={0.01}>
        <group scale={0.38}>
          <mesh geometry={nodes.Ethereum_3D_logoObject_0_lambert2_0.geometry} scale={[1, 0.66, 1]}>
            <meshNormalMaterial color="black" metalness={1} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/ethereum_logo.glb');
