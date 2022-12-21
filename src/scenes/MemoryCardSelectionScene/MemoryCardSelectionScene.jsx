import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
const SideProjects = require("./MemoryCards/sideProjects.json");
const WorkExperience = require("./MemoryCards/workExperience.json")

// const SceneSetup = () => {
//   const { scene } = useThree();
// };

const Highlight = { // Is this even worse?
  "DEFAULT": '',
  "Work Experience": "Work Experience",
  "Side Projects": "Side Projects"
}

const MemoryCardSelectionScreen = () => {
  const [currHighlighted, setCurrHighLighted] = useState(Highlight.DEFAULT);
  const MemoryCard = ({ position, model, color, name, file }) => {
    return (
      <mesh
        position={position}
        onPointerOver={() => setCurrHighLighted(name)}>
        <sphereGeometry></sphereGeometry>
        <meshPhongMaterial color={currHighlighted !== name ? color : 'pink'}></meshPhongMaterial>
      </mesh>
    )
  }

  return (
    <>
      <h1 style={{ zIndex: 1 }}>Memory Card selection2 / {currHighlighted}</h1>
      <Canvas>
        {/* <OrbitControls /> */}
        <ambientLight></ambientLight>
        <pointLight intensity={0.1}></pointLight>
        <MemoryCard
          position={[-2.25, 0, 0]}
          name={Highlight["Work Experience"]}
          color="blue"
          file={WorkExperience}/>
        <MemoryCard
          position={[2.25, 0, 0]}
          name={Highlight["Side Projects"]}
          color="white"
          file={SideProjects}/>
      </Canvas>
    </>
  );
}

export default MemoryCardSelectionScreen;