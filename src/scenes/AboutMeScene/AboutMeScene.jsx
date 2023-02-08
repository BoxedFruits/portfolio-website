import { ArcballControls, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import "../MemoryCardSelectionScene/Modal/Modal.css"
import BackButton from "../../components/BackButton/BackButton";
import CrystalPillar from "./CrystalPillar/CrystalPillar";
import LightOrb from "../SelectionScene/LightOrbs";
import "../AboutMeScene/AboutMeScene.css"
import { DoubleSide, MathUtils } from "three";

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
    content: "https://drive.google.com/file/d/1Q9f7btjdnFQzfXl39Lt3D4e3jA8o0wOi/view?usp=share_link"
  },
  ContactInfo: {
    header: "Contact Info",
    content: "samballesteros.swe@gmail.com"
  },
  HobbiesLikesDislikes: {
    header: "Random Facts About Me",
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

const FloatingBoxes = ({ counter, shouldShrink }) => {
  const boxRef1 = useRef();
  const boxRef2 = useRef();
  const boxRef3 = useRef();
  const boxRef4 = useRef();
  const boxRef5 = useRef();
  const TARGET_SCALE = .8;

  const BOX_PARAMS = [
    {
      ref: boxRef1,
      position: [-2, 2.2, 0],
      rotation: [0, 0, 0]
    },
    {
      ref: boxRef2,
      position: [-3.5, 1, 0],
      rotation: [-1, .5, 0]
    },
    {
      ref: boxRef3,
      position: [-1.8, 0, 0],
      rotation: [.8, -1.3, 0]
    },
    {
      ref: boxRef4,
      position: [-3.5, -1.2, 0],
      rotation: [-1.3, .4, 0]
    },
    {
      ref: boxRef5,
      position: [-1.8, -2, 0],
      rotation: [.6, -.5, 0]
    }
  ]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() / 5.2

    if (boxRef1.current.scale.x <= TARGET_SCALE) {
      const lerpValue = MathUtils.lerp(boxRef1.current.scale.x, TARGET_SCALE, 0.007)

      boxRef1.current.scale.set(lerpValue, lerpValue, lerpValue)
      boxRef2.current.scale.set(lerpValue, lerpValue, lerpValue)
      boxRef3.current.scale.set(lerpValue, lerpValue, lerpValue)
      boxRef4.current.scale.set(lerpValue, lerpValue, lerpValue)
      boxRef5.current.scale.set(lerpValue, lerpValue, lerpValue)
    }

    if (shouldShrink === true && boxRef1.current.scale.x > 0) {
      const lerpValue = MathUtils.lerp(boxRef1.current.scale.x, -.2, 0.03)

      boxRef1.current.scale.set(lerpValue, lerpValue, lerpValue)
      boxRef2.current.scale.set(lerpValue, lerpValue, lerpValue)
      boxRef3.current.scale.set(lerpValue, lerpValue, lerpValue)
      boxRef4.current.scale.set(lerpValue, lerpValue, lerpValue)
      boxRef5.current.scale.set(lerpValue, lerpValue, lerpValue)
    }

    boxRef1.current.rotation.z = -t
    boxRef1.current.rotation.y = -t / 2

    boxRef2.current.rotation.z = t
    boxRef2.current.rotation.y = t / 3
    boxRef2.current.rotation.x = t / 5.4

    boxRef3.current.rotation.z = -t
    boxRef3.current.rotation.y = -t / 2
    boxRef3.current.rotation.x = t / 2

    boxRef4.current.rotation.z = -t
    boxRef4.current.rotation.y = t / 1.5
    boxRef4.current.rotation.x = -t / 1

    boxRef5.current.rotation.z = t
    boxRef5.current.rotation.y = -t
    boxRef5.current.rotation.x = t / 2
  })


  return (
    <>
      {
        BOX_PARAMS.map((e, index) => {
          return (
            <mesh
              scale={0}
              ref={e.ref}
              position={e.position}
              rotation={e.rotation}
            >
              <Html>
                <div color={'white'}>
                  {index}
                </div>
              </Html>
              <boxGeometry />
              <meshPhysicalMaterial
                side={DoubleSide}
                depthTest={false}
                emissive={"#5D3C76"}
                color={counter === index ? "#00CBFF" : "#a3a3a3"}
                reflectivity={.1}
                specularIntensity={.1}
                transmission={counter === index ? .2 : .35}
                clearcoat={1}
                clearcoatRoughness={1}
              />
            </mesh>
          )
        })
      }
    </>
  )
}

const AboutMeScene = ({ prevScene }) => {
  const [lightPillars, setLightPillars] = useState([]); //can be a ref since it doesn't need to setState
  const [counter, setCounter] = useState(0);
  const [contentObj, setContentObj] = useState(Content.ProfessionalSummary)
  const [shouldShrink, setShouldShrink] = useState(false)
  const radian_interval = (2.0 * Math.PI) / 12;
  const radius = 3;

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

    // Glowing portion of pillar. Hardcoded for now
    setLightPillars(prev => [...prev, <CrystalPillar
      isGlowing
      position={[
        (Math.cos(radian_interval * 2) * radius) - .22,
        (Math.sin(radian_interval * 2) * radius) - .45,
        0
      ]}
      rotation-z={(.52 * 2) + 1.64}
    // index={index}
    />])

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
        <ambientLight intensity={.5} color={"lightblue"} />
        <pointLight intensity={10} position={[0, 3, -4]} />
        <pointLight intensity={4} position={[.5, -2, -4]} />
        <CrystalClock>
          {lightPillars}
        </CrystalClock>
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
              </center>
              <div className="buttons">
                <button onClick={() => setCounter(counter - 1)}>
                  <img style={{ height: "30px" }} src="arrow.png" alt="arrow" />
                </button>
                <button style={{ marginTop: "8px" }} onClick={() => setCounter(counter + 1)}>
                  <img src="arrow.png" style={{ transform: "scaleY(-1)", height: "30px" }} alt="arrow" />
                </button>
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