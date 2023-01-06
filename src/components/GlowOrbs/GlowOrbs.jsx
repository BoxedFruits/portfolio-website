
import { useTexture } from '@react-three/drei';
import { AdditiveBlending } from 'three';

const GlowOrbs = () => {
  const orbTexture = useTexture("glow.png")
  return (
    <>
      {/* <mesh scale={1} position={[0,0,1]}>
        <planeGeometry  args={[5, 5]}></planeGeometry>
        <meshBasicMaterial
          map={orbTexture} {...config}
          alphaMap={orbTexture}
        // color="red"
        >
        </meshBasicMaterial>
      </mesh> */}

      <sprite scale={3} position={[0, 0, .6]}>
        <spriteMaterial // should grow and become smaller
          map={orbTexture}
          alphaMap={orbTexture}
          transparent={true}
          opacity={1}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>
      <mesh scale={.36} position={[0, 0, .6]}>
        <sphereGeometry />
        <meshPhongMaterial
          color='white'
          emissive='white'
          emissiveIntensity={40.25}
          toneMapped={false}
          transparent={true}
          opacity={0}
        />
      </mesh>

    </>
  );
}
export default GlowOrbs