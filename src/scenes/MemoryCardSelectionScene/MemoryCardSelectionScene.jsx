import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import MemoryCard from "./MemoryCard";

const SideProjects = require("./MemoryCards/sideProjects.json");
const WorkExperience = require("./MemoryCards/workExperience.json")

// const SceneSetup = () => {
//   const { scene } = useThree();
// };

const Highlight = { // Is this even worse?
  WorkExperience: {
    title: "Work Experience"
  },
  SideProjects: {
    title: "Side Projects"
  }
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
  const [currHighlighted, setCurrHighLighted] = useState(Highlight.WorkExperience.title);
  const [viewObjects, setViewObjects] = useState();

  return (
    <>
      {viewObjects ?
        <ObjectSelection>

        </ObjectSelection>
        :
        <Canvas camera={{ position: [0, 0, -12] }}>
          <OrbitControls />
          <ambientLight></ambientLight>
          <Html fullscreen >
            <h1 style={{ position: 'absolute', marginLeft: '20px' }}>PS2</h1>
            <h1 style={{ float: 'right', marginRight: '20px' }}>Memory Card (PS2) / {currHighlighted}</h1>
          </Html>
          <pointLight intensity={0.1}></pointLight>
          <MemoryCard
            position={[2.25, 0, 0]}
            name={Highlight.WorkExperience.title}
            file={WorkExperience}
            setViewObjects={setViewObjects}
            currHighlighted={currHighlighted.title}
            setCurrHighLighted={setCurrHighLighted}
            viewObjects={viewObjects} />
          <MemoryCard
            position={[-2.25, 0, 0]}
            name={Highlight.SideProjects.title}
            file={SideProjects}
            setViewObjects={setViewObjects}
            currHighlighted={currHighlighted.title}
            setCurrHighLighted={setCurrHighLighted}
            viewObjects={viewObjects} />
        </Canvas>}

    </>
  );
}

export default MemoryCardSelectionScreen;