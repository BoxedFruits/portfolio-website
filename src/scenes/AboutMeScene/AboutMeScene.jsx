import { ArcballControls, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import "../MemoryCardSelectionScene/Modal/Modal.css"
import BackButton from "../../components/BackButton/BackButton";
import CrystalPillar from "./CrystalPillar/CrystalPillar";
import LightOrb from "../SelectionScene/LightOrbs";
import "../AboutMeScene/AboutMeScene.css"

/* TODO: date and time */
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
    content: "a link?"
  },
  ContactInfo: {
    header: "Contact Info",
    content: "samballesteros.swe@gmail.com"
  },
  HobbiesLikesDislikes: {
    header: "Hobbies/Likes/Dislikes",
    content: "- Hobbies: Videogames, Guitar, Piano, Gym, Learning \n - Likes: Pepperoni pizza, Cooking, Mechanical Keyboards \n - Dislikes: When people don’t put back their weights at the gym"
  }
}

const CrystalClock = (props) => {
  const clockRef = useRef(null);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime() / 8;
    clockRef.current.rotation.y = a;
  })

  return (
    <group position={[-1.5, .25, -1.5]} ref={clockRef}>
      {props.children}
      <LightOrb />
    </group>
  )
}

const AboutMeScene = ({ prevScene }) => {
  const [lightPillars, setLightPillars] = useState([]); //can be a ref since it doesn't need to setState
  const [counter, setCounter] = useState(0);
  const [contentObj, setContentObj] = useState(Content.ProfessionalSummary)
  const radian_interval = (2.0 * Math.PI) / 12;
  const radius = 3;

  const BOX_PARAMS = [
    {
      position: [-2, 2.2, 0]
    },
    {
      position: [-3.5, 1, 0]
    },
    {
      position: [-1.8, 0, 0]
    },
    {
      position: [-3.5, -1.2, 0]
    },
    {
      position: [-1.8, -2, 0]
    }
  ]

  useEffect(() => {
    for (let index = 0; index < 12; index++) {
      setLightPillars(prev => [...prev, <CrystalPillar
        position={[
          (Math.cos(radian_interval * index) * radius),
          (Math.sin(radian_interval * index) * radius),
          0
        ]}
        rotation-z={(.52 * index) + 1.64}
        index={index}
      />])
    }
  }, [])

  useEffect(() => { //TODO: Refactor
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
      case -1:
        setCounter(4)
        break;
      default: setCounter(0)
    }
  }, [counter])

  return (
    <>
      <Canvas className="about-me" style={{ zIndex: 0, position: "absolute" }}>
        <ArcballControls />
        <ambientLight intensity={.5} color={"lightblue"}/>
        <pointLight intensity={10} position={[0,3,-4]}/>
        <pointLight intensity={4} position={[.5,-2,-4]}/>
        <CrystalClock>
          {lightPillars}
        </CrystalClock>
      </Canvas>
      <div className="blurred-div" />
      <Canvas className="foo" style={{ zIndex: 2, position: "absolute" }}>
        {BOX_PARAMS.map((e, index) => {
          return (
            <mesh scale={.8} position={e.position}>
              <Html>
                <div>
                  {index}
                </div>
              </Html>
              <boxGeometry />
              <meshNormalMaterial />
            </mesh>
          )
        })}
      </Canvas>
      <div style={{ zIndex: 3, position: "absolute", width: "100%", height: "100%" }}>
        <div className="modal-body-container about-me-container">
          <center>
            <h1 className="title arial-lighter text-shadow" style={{ fontSize: "3.25em", marginBottom: ".5em" }}>About Me</h1>
            <h2 className="highlight arial-lighter text-shadow-thinner" style={{ fontSize: "3.25em", marginTop: "0em", marginBottom: "0.25em" }}>
              {contentObj.header}
            </h2>
            <p className="modal-body arial-lighter text-shadow-thinner">
              {contentObj.content}
            </p>
            <button onClick={() => setCounter(counter - 1)}>decerement</button>
            <button onClick={() => setCounter(counter + 1)}>increment</button>
          </center>
        </div>
        <BackButton onClick={prevScene} />
      </div>
    </>
  )
}

export default AboutMeScene;