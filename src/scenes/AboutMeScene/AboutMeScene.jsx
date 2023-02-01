import { ArcballControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState } from "react";
import { useEffect } from "react";
import BackButton from "../../components/BackButton/BackButton";
import CrystalPillar from "./CrystalPillar/CrystalPillar";
import LightOrb from "../SelectionScene/LightOrbs";
import { useRef } from "react";

const CrystalClock = (props) => {
  const clockRef = useRef(null);
  console.log(props)
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
      <Canvas>
        <ArcballControls />
        <ambientLight />
        <CrystalClock>
          {lightPillars}
        </CrystalClock>
      </Canvas>
      <BackButton onClick={prevScene} />
    </>
  )
}

export default AboutMeScene;