import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import MemoryCard from "./MemoryCard";

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

const ObjectSelection = () => {
  return (
    <Canvas>
      <mesh>
        <boxGeometry></boxGeometry>
      </mesh>
    </Canvas>
  )
}

const MemoryCardSelectionScreen = () => {
  const [currHighlighted, setCurrHighLighted] = useState(Highlight.DEFAULT);
  const [viewObjects, setViewObjects] = useState();

  return (
    <>
      <h1 style={{ zIndex: 1 }}>Memory Card selection2 / {currHighlighted}</h1>
      {viewObjects ?
        <ObjectSelection>

        </ObjectSelection>
        :
        <Canvas>
          <OrbitControls />
          <ambientLight></ambientLight>
          <pointLight intensity={0.1}></pointLight>
          <MemoryCard
            position={[-2.25, 0, 0]}
            name={Highlight["Work Experience"]}
            file={WorkExperience}
            setViewObjects={setViewObjects}
            currHighlighted={currHighlighted}
            setCurrHighLighted={setCurrHighLighted} />
          <MemoryCard
            position={[2.25, 0, 0]}
            name={Highlight["Side Projects"]}
            file={SideProjects}
            setViewObjects={setViewObjects}
            currHighlighted={currHighlighted}
            setCurrHighLighted={setCurrHighLighted} />
        </Canvas>}

    </>
  );
}

export default MemoryCardSelectionScreen;