import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { useLoader } from '@react-three/fiber'

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

  const MemoryCard = ({ position, model, color, name, file }) => { // Pass in setCurrHighLighted and currhighlighted as props and then make this a sperate component
    const { scene } = useLoader(GLTFLoader, 'memory_card.glb')
    const copiedScene = useMemo(() => scene.clone(), [scene])

    return (
      <group>
        <primitive
          onPointerOver={() => setCurrHighLighted(name)} 
          position={position}
          onClick={() => {setViewObjects(true);}}
          object={copiedScene}>
        </primitive>
      </group>
    );
  }

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
            color="blue"
            file={WorkExperience} />
          <MemoryCard
            position={[2.25, 0, 0]}
            name={Highlight["Side Projects"]}
            color="white"
            file={SideProjects} />
        </Canvas>}

    </>
  );
}

export default MemoryCardSelectionScreen;