/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 penAndPaper.glb
*/

import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

const MARGIN = .015;

export function PenAndPaper({ shouldRotate, getRef, animationCallback, targetScale, loadAnimation, shrink, ...props }) {
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
        const lerpValue = MathUtils.lerp(ref.current.scale.x, targetScale, 0.0245);
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
  const penRef = useRef();
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();

    penRef.current.rotation.x = Math.sin(15 * a) / 10;
    penRef.current.position.z = Math.cos(20 * a) / 30 + -0.25;
    penRef.current.position.x = Math.cos(4 * a) / 6;
  });

  const { nodes, materials } = useGLTF('models/penAndPaper.glb');
  return (
    <group
      ref={ref}
      rotation-x={3.3} 
      rotation-z={-.05}
      dispose={null}
      scale={0}
      {...props}
      startLoadingAnimation={startLoadingAnimation}
      triggerShrinkAnimation={() => { setShrinkAnimation(true); }}>
      <group ref={penRef} rotation-x={.2} position={[3, -.1, 1]}>
        <group position={[-0.07, 0.25, 0.03]} rotation={[2.3, -0.3, 1.63]} scale={15.84}>
          <mesh geometry={nodes.pen_base_Cylinder_1.geometry} material={materials.pen_black} />
          <mesh geometry={nodes.pen_base_Cylinder_2.geometry} material={materials.pen_gold} />
          <mesh geometry={nodes.pen_base_Cylinder_3.geometry} material={materials.pen_head} />
        </group>
        <group position={[-0.07, 0.25, 0.03]} rotation={[2.3, -0.3, 1.63]} scale={15.84}>
          <mesh geometry={nodes.pen_lid_Cylinder001_1.geometry} material={materials.pen_gold} />
          <mesh geometry={nodes.pen_lid_Cylinder001_2.geometry} material={materials.pen_black} />
        </group>
      </group>
      <group scale={0.01}>
        <mesh geometry={nodes.Notepad_LP_Notepad_0.geometry} material={materials.Notepad} position={[0, 0.58, -0.23]} rotation={[-Math.PI / 2, 0, 0]} scale={20.7} />
      </group>
    </group>
  );
}

useGLTF.preload('models/penAndPaper.glb');
