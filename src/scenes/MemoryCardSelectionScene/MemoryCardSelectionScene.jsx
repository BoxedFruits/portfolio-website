import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { MemoryCard } from "./MemoryCard";
import ObjectSelector from "./ObjectSelector/ObjectSelector";

const SideProjects = require("./MemoryCards/sideProjects.json")
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



const MemoryCardSelectionScreen = () => {
  const [currHighlighted, setCurrHighLighted] = useState(Highlight.WorkExperience.title);
  const [viewObjects, setViewObjects] = useState();
  return (
    <>
    <div className="fadeout-animation" onAnimationEnd={(e) => e.target.style.display = "none"}></div>
      {viewObjects ?
        <ObjectSelector
          memoryCardName={currHighlighted}
          jsonObject={
            currHighlighted === Highlight.WorkExperience.title ? WorkExperience : SideProjects
          }
        />
        :
        <Canvas camera={{ position: [0, 0, 10] }}> {/* Need to play around with either FOV or orthographic camera to avoid the fisheye lens effect*/}
          <OrbitControls />
          <ambientLight intensity={1.3}></ambientLight>
          <Html fullscreen >
            <h1 className="text-shadow arial-lighter" style={{ position: 'absolute', marginLeft: '20px', color:"white" }}>PS2</h1>
            <h1 className="text-shadow arial-lighter" style={{ float: 'right', marginRight: '20px', color: 'rgb(221, 221, 78)', display: "flex", alignItems: "center" }}>
              Memory Card
              <span style={{ fontSize: "24px" }}>&nbsp;(PS2)&nbsp;</span> / {currHighlighted}
            </h1>
          </Html>
          <pointLight position={[2.5, 9, 2]} intensity={.45}></pointLight>
          <pointLight position={[-2.5, 9, 2]} intensity={.45}></pointLight>
          <MemoryCard
            position={[-2.25, 0, 0]}
            name={Highlight.WorkExperience.title}
            setViewObjects={setViewObjects}
            currHighlighted={currHighlighted}
            setCurrHighLighted={setCurrHighLighted}
            viewObjects={viewObjects} />
          <MemoryCard
            position={[2.25, 0, 0]}
            name={Highlight.SideProjects.title}
            setViewObjects={setViewObjects}
            currHighlighted={currHighlighted}
            setCurrHighLighted={setCurrHighLighted}
            viewObjects={viewObjects} />
        </Canvas>
      }
    </>
  );
}

export default MemoryCardSelectionScreen;