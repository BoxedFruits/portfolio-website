/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 dumbbell.glb
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three';

const MARGIN = .535;

export function Dumbbell({ shouldRotate, getRef, animationCallback, targetScale, loadAnimation, shrink, ...props }) {
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
        const lerpValue = MathUtils.lerp(ref.current.scale.x, targetScale, 0.02)
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

  const startLoadingAnimation = () => {
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

  const { nodes, materials } = useGLTF('models/dumbbell.glb')
  return (
    <group
      ref={ref}
      dispose={null}
      scale={0}
      {...props}
      startLoadingAnimation={startLoadingAnimation}
      triggerShrinkAnimation={() => { setShrinkAnimation(true); }}
    >
      <mesh geometry={nodes.Circle002.geometry} material={materials['Material.002']} position={[0.15, 0, 0]} rotation={[-Math.PI, 0, Math.PI / 2]} scale={[0.07, 0.09, 0.07]} />
      <mesh geometry={nodes.Circle003.geometry} material={materials['Material.002']} position={[0.12, 0, 0]} rotation={[-Math.PI, 0, Math.PI / 2]} scale={[0.12, 0.15, 0.12]} />
      <mesh geometry={nodes.Circle004.geometry} material={materials['Material.002']} position={[0.15, 0, 0]} rotation={[Math.PI, 0, -Math.PI / 2]} scale={0.03} />
      <mesh geometry={nodes.Circle005.geometry} material={materials['Material.002']} position={[-0.15, 0, 0]} rotation={[-Math.PI, 0, -Math.PI / 2]} scale={[0.07, 0.09, 0.07]} />
      <mesh geometry={nodes.Circle008.geometry} material={materials['Material.002']} position={[-0.15, 0, 0]} rotation={[Math.PI, 0, Math.PI / 2]} scale={0.03} />
      <mesh geometry={nodes.Circle009.geometry} material={materials['Material.002']} position={[-0.12, 0, 0]} rotation={[-Math.PI, 0, -Math.PI / 2]} scale={[0.12, 0.15, 0.12]} />
      <mesh geometry={nodes.Cylinder.geometry} material={materials['Material.001']} rotation={[0, 0, -1.57]} scale={[-0.01, -0.1, -0.01]} />
    </group>
  )
}

useGLTF.preload('models/dumbbell.glb')
