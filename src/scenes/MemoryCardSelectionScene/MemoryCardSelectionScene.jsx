import { Canvas } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import GlowOrb from "../../components/GlowOrb/GlowOrb";
import { MemoryCard } from "./3dModels/MemoryCard";
import ObjectSelector from "./ObjectSelector/ObjectSelector";
import { EnableSoundContext } from "../../App";

const SideProjects = require("./MemoryCards/sideProjects.json");
const WorkExperience = require("./MemoryCards/workExperience.json");

const Highlight = {
  WorkExperience: {
    title: "Work Experience"
  },
  SideProjects: {
    title: "Side Projects"
  }
}

const MemoryCardSelectionScreen = ({ prevScene }) => {
  const [currHighlighted, setCurrHighLighted] = useState(Highlight.WorkExperience.title);
  const [viewObjects, setViewObjects] = useState();
  const [orbPosition, setOrbPosition] = useState([-2.05, .25, 1]);
  const [startAnimation, setStartAnimation] = useState(false);
  const { isMuted, _ } = useContext(EnableSoundContext);
  const selectedAudioRef = useRef(null);
  const audioRef = useRef(null);
  const lastOrbPosition = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("selectionSound2.mp3");
    selectedAudioRef.current = new Audio("selectionSound3.mp3");

    if (isMuted === true) {
      audioRef.current.muted = true;
      selectedAudioRef.current.muted = true;
    }
  });

  useEffect(() => {
    if (JSON.stringify(lastOrbPosition.current) !== JSON.stringify(orbPosition)) {
      lastOrbPosition.current = orbPosition;
      audioRef.current.play();
    }
  }, [orbPosition]);

  const handlePointerOver = (title, pos) => {
    if (!startAnimation) {
      setOrbPosition(pos);
      setCurrHighLighted(title);
    }
  };

  const handleClick = () => {
    selectedAudioRef.current.play();
    setStartAnimation(true);
    setTimeout(() => { // Let animation play before setting state and changing scene
      setViewObjects(true);
    }, 750);
  };

  const handleAnimationEnd = (e) => {
    e.target.style.display = "none";
  };

  const closeObjectSelector = () => {
    setStartAnimation(false); 
    setViewObjects(false)
  };

  return (
    <>
      <div className="fadeout-animation" onAnimationEnd={handleAnimationEnd} />
      <div style={{ position: "absolute", width: "100%", height: "100%", backgroundImage: "linear-gradient(145deg, rgb(126, 122, 122) 0%, rgba(0, 0, 0, 1) 116%)" }}></div>
      {viewObjects ?
        <ObjectSelector
          memoryCardName={currHighlighted}
          jsonObject={
            currHighlighted === Highlight.WorkExperience.title ? WorkExperience : SideProjects
          }
          closeObjectSelector={closeObjectSelector}
        />
        :
        <>
          <h1 className="text-shadow arial-lighter" style={{ position: 'absolute', marginLeft: '20px', color: "white", fontSize: "48px" }}>PS2</h1>
          <h1 className="text-shadow arial-lighter" style={{ float: 'right', marginRight: '20px', color: 'rgb(221, 221, 78)', display: "flex", alignItems: "center", fontSize: "48px", position: "relative" }}>
            Memory Card
            <span style={{ fontSize: "32px" }}>&nbsp;(PS2)&nbsp;</span> / {currHighlighted}
          </h1>
          {/* TODO: Fadeout animation when transitioning back */}
          <BackButton onClick={prevScene} />
          <Canvas camera={{ position: [0, 0, 10] }}>
            <ambientLight intensity={1.3} />
            <pointLight position={[2.5, 9, 2]} intensity={.45} />
            <pointLight position={[-2.5, 9, 2]} intensity={.45} />
            <GlowOrb position={orbPosition} />
            <MemoryCard
              position={[-2.25, 0, 0]}
              name={Highlight.WorkExperience.title}
              setViewObjects={setViewObjects}
              startAnimation={startAnimation && currHighlighted === Highlight.WorkExperience.title}
              onClick={handleClick}
              onPointerOver={() => handlePointerOver(Highlight.WorkExperience.title, [-2.05, .25, 1])}
            />
            <MemoryCard
              position={[2.25, 0, 0]}
              name={Highlight.SideProjects.title}
              setViewObjects={setViewObjects}
              startAnimation={startAnimation && currHighlighted === Highlight.SideProjects.title}
              onClick={handleClick}
              onPointerOver={() => handlePointerOver(Highlight.SideProjects.title, [2.05, .25, 1])}
            />
          </Canvas>
        </>
      }
    </>
  );
}

export default MemoryCardSelectionScreen;