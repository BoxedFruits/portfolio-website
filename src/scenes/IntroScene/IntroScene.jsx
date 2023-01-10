import { Canvas } from "@react-three/fiber"

const IntroScene = () => {

  return (
    <Canvas>
      <ambientLight/>
      <mesh>
        <boxGeometry/>
        <meshBasicMaterial color={"blue"} />
      </mesh>
    </Canvas>
  )

}

export default IntroScene