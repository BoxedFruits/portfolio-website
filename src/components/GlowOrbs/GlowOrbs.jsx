import { NoBlending, TextureLoader } from "three";

const GlowOrbs = (props) => {
  const map = new TextureLoader().load('glow.png')
  return (
    <mesh {...props}>
      <sprite scale={5}>
        <spriteMaterial
          map={map}
          color="white"
          alphaMap={map}
          transparent={false}
          blending={NoBlending}
        />
      </sprite>
      <sphereGeometry />
      <meshPhongMaterial color='white' />
    </mesh>
  )
}

export default GlowOrbs;