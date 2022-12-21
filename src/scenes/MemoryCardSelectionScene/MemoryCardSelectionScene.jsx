import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

// const SceneSetup = () => {
//   const { scene } = useThree();
// };

const Highlight = { // Is this even worse?
  DEFAULT: 0,
  "Job Experience": 1,
  "Side Projects": 2
}

const MemoryCardSelectionScreen = () => {
  const [currHighlighted, setCurrHighLighted] = useState(Highlight.DEFAULT);

  const MemoryCard = ({ position, model, color, name, highlight }) => {
    console.log(name, currHighlighted)
    return (
      <mesh
        position={position}
        onPointerOver={(event) => { setCurrHighLighted(name); console.log(event, name) }}>
        <sphereGeometry></sphereGeometry>
        <meshPhongMaterial color={highlight !== name ? color : 'pink'}></meshPhongMaterial>
      </mesh>
    )
  }

  return (
    <>
      <h1 style={{ zIndex: 1 }}>Memory Card selection2</h1>
      <Canvas>
        {/* <OrbitControls /> */}
        <ambientLight></ambientLight>
        <pointLight intensity={0.1}></pointLight>
        <MemoryCard position={[-2.25, 0, 0]} name={Highlight["Job Experience"]} color="blue" highlight={currHighlighted} />
        <MemoryCard position={[2.25, 0, 0]} name={Highlight["Side Projects"]} color="white" highlight={currHighlighted} />
      </Canvas>
    </>
  );
}

export default MemoryCardSelectionScreen;