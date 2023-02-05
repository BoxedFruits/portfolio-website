
import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail, useTexture } from '@react-three/drei'
import { AdditiveBlending } from "three";

const offset = 4.5

function LightOrb({ index }) {
  const mesh = useRef();
  const orbTexture = useTexture("glow.png")

  useFrame(() => {
    //Note: Not entirely sure how this function works. tried to take apart an implementation of the ligh orb algorithm but wasn't producing the same results but this is close enough
    let currentTime = new Date();
    const foo = 1.65 * (index / 7 * (currentTime.getSeconds() + currentTime.getMilliseconds() * 0.001))

    mesh.current.position.z = Math.sin(foo)
    mesh.current.position.y = Math.cos(foo)
    mesh.current.position.x = Math.cos(foo)
  })

  return (
    <group position={[0,0,0]}>
      <group ref={mesh} position={[offset, 0, 0]}>
        <sprite
        >
          <spriteMaterial
            map={orbTexture}
            alphaMap={orbTexture}
            blending={AdditiveBlending}
            transparent
            opacity={.5}
            color={"#40a3c4"}
          />
        </sprite>
        <Trail width={.85}
          length={20}
          decay={1.5}
          color={"#40a3c4"}
          attenuation={(t) => {
            return (t * t) / 1.5
          }}>
          <mesh scale={.05}>
            <sphereGeometry />
            <meshBasicMaterial color="#40a3c4" />
          </mesh>
        </Trail>
      </group>
    </group>
  )
}

function LightOrbs() {
  const [orbs, setOrbs] = useState([]);
  const orbsRef = useRef();
  useEffect(() => {
    if (orbs.length === 0) {
      for (let i = 0; i < 7; i++) {
        setOrbs(prev => [...prev, <LightOrb index={i + 1} key={i + 1}></LightOrb>]);
      }
    }
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    orbsRef.current.rotateX((Math.sin(a) / 90) + .001)
    orbsRef.current.rotateY(Math.cos(a) / 400)
    orbsRef.current.rotateZ((Math.sin(a) / 700) + .0001)
  })

  return (
    <>
      <group ref={orbsRef} scale={1} position={[-.25, 0, 0]}>
        {orbs}
      </group>
      <pointLight intensity={3} />
      <directionalLight />
    </>
  );
}

export default LightOrbs;