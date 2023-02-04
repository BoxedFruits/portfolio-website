import { ArcballControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import BackButton from "../../components/BackButton/BackButton";
import CrystalPillar from "./CrystalPillar/CrystalPillar";
import LightOrb from "../SelectionScene/LightOrbs";
import "../AboutMeScene/AboutMeScene.css"

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
  }, [])

  return (
    <>
      <Canvas className="about-me" style={{ zIndex: 0, position: "absolute" }}>
        <ArcballControls />
        <ambientLight />
        <CrystalClock>
          {lightPillars}
        </CrystalClock>
      </Canvas>
      <div className="blurred-div" />
      <Canvas className="foo" style={{ zIndex: 2, position: "absolute" }}>
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
      <div style={{ zIndex: 3, position: "absolute", width: "100%", height: "100%" }}>
        {/* TODO: date and time */}
        <div> {/* this is where all of the sections will go */}
          <h1 className="title arial-lighter text-shadow"> About Me </h1>
        </div>
        <BackButton onClick={prevScene} />
      </div>
    </>
  )
}

export default AboutMeScene;