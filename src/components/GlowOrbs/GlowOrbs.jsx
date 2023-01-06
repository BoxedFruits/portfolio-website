
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { AdditiveBlending } from 'three';

const GlowOrbs = (props) => {
  let spriteRef = useRef();
  let sphereRef = useRef();
  
  useFrame(({clock}) => {
    const a = clock.getElapsedTime()
    const spriteScale = (Math.sin((2.5 * a) / Math.PI)) + 5;
    const sphereScale = ((Math.sin((2.505 * a) / Math.PI)) / 7.75) + .25;

    spriteRef.current.scale.set(spriteScale, spriteScale, spriteScale)
    sphereRef.current.scale.set(sphereScale, sphereScale, sphereScale)
  })

  const orbTexture = useTexture("glow.png")
  return (
    <>
      <sprite 
        ref={spriteRef}
        scale={3}
        position={[0, 0, .6]}
        {...props}>
        <spriteMaterial
          map={orbTexture}
          alphaMap={orbTexture}
          transparent={true}
          opacity={1}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>
      <mesh 
        ref={sphereRef}
        scale={.36}
        position={[0, 0, .6]}
        {...props}>
        <sphereGeometry />
        <meshPhongMaterial
          color='white'
          emissive='white'
          emissiveIntensity={40.25}
          toneMapped={false}
          transparent={true}
          opacity={0.45}
        />
      </mesh>

    </>
  );
}
export default GlowOrbs