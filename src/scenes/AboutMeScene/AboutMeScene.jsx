import { ArcballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useContext } from "react";
import "../MemoryCardSelectionScene/Modal/Modal.css"
import BackButton from "../../components/BackButton/BackButton";
import "../AboutMeScene/AboutMeScene.css"
import { EnableSoundContext } from "../../App";
import FloatingBoxes from "./FloatingBoxes";
import CrystalClock from "./CrystalClock";

const Content = {
  ProfessionalSummary: {
    header: "Professional Summary",
    content: "Hi! My name is Samuel Ballesteros but most people call me Sam. I have previously worked at Vanguard and interned at Nasdaq. Most of my experience specializes in Front-End development using Angular as well as a few side projects using React though, the most important thing for me is being able to face interesting problems so I am willing to learn anything."
  },
  EmployementStatus: {
    header: "Employement Status",
    content: "I am currently looking for a new role! I strongly prefer remote work but willing to work things out for the right opportunity. I have experience with Front-End development but would love to explore Back-End development as well as Security related roles. "
  },
  Resume: {
    header: "Resume",
    content: "https://drive.google.com/file/d/1Yv-D2UZ53sU1NTJbD_BI84dwZ8_Z2jFT/view?usp=sharing"
  },
  ContactInfo: {
    header: "Contact Info",
    content: "samballesteros.swe@gmail.com"
  },
  HobbiesLikesDislikes: {
    header: "Random Facts About Me",
    content: "Some of my favorite things to do is to go to the gym, cook and play videogames. I also really like pizza (and no, pineapple does not belong on pizza). I often get mistaken for being super serious but I'm the exact opposite, I'm just really akward I swear. I am always up for a chat and to joke around."
  }
}

const ChangeContentButton = ({ changeContent, direction }) => (
  <button onClick={changeContent}>
    <img className={`${direction}-arrow`} src="arrow.png" alt={`${direction} arrow`} />
  </button>
);

const AboutMeScene = ({ prevScene }) => {
  const [counter, setCounter] = useState(0);
  const [contentObj, setContentObj] = useState(Content.ProfessionalSummary)
  const [shouldShrink, setShouldShrink] = useState(false)
  const { isMuted, _ } = useContext(EnableSoundContext);
  const date = new Date()
  const [time, setTime] = useState(date.toLocaleString())


  useEffect(() => { //TODO: Refactor
    const highlightAudio = new Audio("selectionSound2.mp3");
    highlightAudio.muted = isMuted;
    highlightAudio.play();

    switch (counter) {
      case 0:
        setContentObj(Content.ProfessionalSummary)
        break;
      case 1:
        setContentObj(Content.EmployementStatus)
        break
      case 2:
        setContentObj(Content.Resume)
        break
      case 3:
        setContentObj(Content.ContactInfo)
        break
      case 4:
        setContentObj(Content.HobbiesLikesDislikes)
        break
      case 5:
        setCounter(0)
        break;
      case -1: //Needed if you press the up arrow at index 0
        setCounter(4)
        break;
      default: setCounter(0)
    }
  }, [counter])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(date.toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, [time])

  return (
    <>
      <Canvas className="about-me-bg">
        <ambientLight intensity={.5} color={"lightblue"} />
        <pointLight intensity={10} position={[0, 3, -4]} />
        <pointLight intensity={4} position={[.5, -2, -4]} />
        <CrystalClock />
      </Canvas>
      <div className="blurred-div" />
      <Canvas style={{ zIndex: 2, position: "absolute" }}>
        <ambientLight intensity={.6}></ambientLight>
        <ArcballControls />
        <FloatingBoxes counter={counter} shouldShrink={shouldShrink} />
      </Canvas>
      {shouldShrink ?
        <div className="fadein-animation" onAnimationEnd={prevScene}></div> :
        <>
          <div className="fadeout-animation" onAnimationEnd={(e) => e.target.style.display = "none"} />
          <div className="about-me-wrapper">
            <div className="date-things text-shadow arial-lighter">
              <div>{date.toLocaleDateString()}</div>
              <div>{time}</div>
            </div>
            <div className="about-me-section">
              <div className="about-me-section-content">
                <h1 className="title arial-lighter text-shadow about-me-title">About Me</h1>
                <h2 className="highlight arial-lighter text-shadow-thinner about-me-header">
                  {contentObj.header}
                </h2>
                <p className="modal-body arial-lighter text-shadow-thinner">
                  {contentObj.content}
                </p>
              </div>
              <div className="buttons">
                <ChangeContentButton changeContent={() => setCounter(counter - 1)} direction="up" />
                <ChangeContentButton changeContent={() => setCounter(counter + 1)} direction="down" />
              </div>
            </div>
            <BackButton onClick={() => setShouldShrink(true)} />
          </div>
        </>
      }
    </>
  )
}

export default AboutMeScene;