import { ArcballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { useEffect } from "react";
import BackButton from "../../components/BackButton/BackButton";
import CrystalPillar from "./CrystalPillar/CrystalPillar";
import LightOrb from "../SelectionScene/LightOrbs";

const AboutMeScene = ({ prevScene }) => {
  const [lightPillars, setLightPillars] = useState([])
  const radian_interval = (2.0 * Math.PI) / 12;
  const radius = 5
  useEffect(() => {
    //Should lookAt center
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
        <group position={[0, 0, 0]}>
          {lightPillars}
        </group>
        <LightOrb></LightOrb>
      </Canvas>
      <BackButton onClick={prevScene} />
    </>
  )
}

export default AboutMeScene;