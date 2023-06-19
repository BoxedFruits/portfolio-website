/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 nasdaq.glb
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { MathUtils } from 'three';
import { useFrame } from '@react-three/fiber';

const MARGIN = .035; // `lerp` doesn't go up to the exact value so stop a little bit prior to target

export function NasdaqLogo({ shouldRotate, getRef, animationCallback, targetScale, loadAnimation, shrink, ...props }) {
  const ref = useRef();
  const [isLoadingAnimationFinished, setIsLoadingAnimationFinished] = useState(null);
  const [shrinkAnimation, setShrinkAnimation] = useState(false);

  useFrame(({ clock }) => {
    if (shouldRotate) {
      const t = clock.getElapsedTime()
      ref.current.rotation.z = t
    }

    if (isLoadingAnimationFinished === false) {
      if (ref.current.scale.x <= targetScale - MARGIN) {
        const lerpValue = MathUtils.lerp(ref.current.scale.x, targetScale, 0.019)
        ref.current.scale.set(lerpValue, lerpValue, lerpValue)
      } else {
        if (animationCallback) animationCallback(); // tell parent component animation is finished
        setIsLoadingAnimationFinished(true);
      }
    }

    if (shrinkAnimation === true) {
      const lerpValue = MathUtils.lerp(ref.current.scale.x, -0.02, 0.25)
      ref.current.scale.set(lerpValue, lerpValue, lerpValue)
    }

  })

  const startLoadingAnimation = async () => {
    setIsLoadingAnimationFinished(false);
  }

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
  }, [])

  const { nodes, materials } = useGLTF('models/nasdaq.glb')

  return (
    <group
      ref={ref}
      dispose={null}
      rotation-x={3.7}
      scale={0}
      {...props}
      startLoadingAnimation={() => startLoadingAnimation()}
      triggerShrinkAnimation={() => { console.log("SHRINKIT"); setShrinkAnimation(true); }}
    >
      <mesh geometry={nodes.NurbsPath.geometry} material={materials.Blue} position={[-1.68, -0.01, 2.06]} />
      <mesh geometry={nodes.Cube.geometry} material={materials.Blue} position={[-0.54, -0.01, 0.19]} />
      <mesh geometry={nodes.NurbsPath001.geometry} material={materials.Blue} position={[1.59, -0.01, -2.07]} rotation={[-Math.PI, 0, -Math.PI]} />
    </group>
  )
}

useGLTF.preload('models/nasdaq.glb')
