import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import GlowOrb from "../../components/GlowOrb/GlowOrb";
import { MemoryCard } from "./MemoryCard";
import ObjectSelector from "./ObjectSelector/ObjectSelector";

const SideProjects = require("./MemoryCards/sideProjects.json")
const WorkExperience = require("./MemoryCards/workExperience.json")

const Highlight = {
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
  const [orbPosition, setOrbPosition] = useState([-2.05, .25, 1])
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("selectionSound2.mp3");
  })

  useEffect(() => {
    audioRef.current.play();
  }, [orbPosition])

  return (
    <>
      <div className="fadeout-animation" onAnimationEnd={(e) => e.target.style.display = "none"}></div>
      <div style={{ position: "absolute", width: "100%", height: "100%", backgroundImage: "linear-gradient(145deg, rgb(126, 122, 122) 0%, rgba(0, 0, 0, 1) 116%)" }}></div>
      {viewObjects ?
        <ObjectSelector
          memoryCardName={currHighlighted}
          jsonObject={
            currHighlighted === Highlight.WorkExperience.title ? WorkExperience : SideProjects
          }
        />
        :
        <Canvas camera={{ position: [0, 0, 10] }}> {/* Need to play around with either FOV or orthographic camera to avoid the fisheye lens effect*/}
          {/* <OrbitControls /> */}
          <ambientLight intensity={1.3}></ambientLight>
          <Html fullscreen >
            <h1 className="text-shadow arial-lighter" style={{ position: 'absolute', marginLeft: '20px', color: "white" }}>PS2</h1>
            <h1 className="text-shadow arial-lighter" style={{ float: 'right', marginRight: '20px', color: 'rgb(221, 221, 78)', display: "flex", alignItems: "center" }}>
              Memory Card
              <span style={{ fontSize: "24px" }}>&nbsp;(PS2)&nbsp;</span> / {currHighlighted}
            </h1>
          </Html>
          <pointLight position={[2.5, 9, 2]} intensity={.45}></pointLight>
          <pointLight position={[-2.5, 9, 2]} intensity={.45}></pointLight>
          <GlowOrb position={orbPosition} />
          <MemoryCard
            position={[-2.25, 0, 0]}
            name={Highlight.WorkExperience.title}
            setViewObjects={setViewObjects}
            onPointerOver={() => {
              setOrbPosition([-2.05, .25, 1]);
              setCurrHighLighted(Highlight.WorkExperience.title)
            }}
          />
          <MemoryCard
            position={[2.25, 0, 0]}
            name={Highlight.SideProjects.title}
            setViewObjects={setViewObjects}
            onPointerOver={() => {
              setOrbPosition([2.05, .25, 1]);
              setCurrHighLighted(Highlight.SideProjects.title)
            }}
          />
        </Canvas>
      }
    </>
  );
}

export default MemoryCardSelectionScreen;