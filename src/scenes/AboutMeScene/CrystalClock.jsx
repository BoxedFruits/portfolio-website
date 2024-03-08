import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import LightOrbs from "../SelectionScene/LightOrbs";
import CrystalPillar from "./CrystalPillar/CrystalPillar";

const radian_interval = (2.0 * Math.PI) / 12;
const radius = 3;

const CrystalClock = () => {
  const clockRef = useRef(null);
  const [lightPillars, setLightPillars] = useState([]); //can be a ref since it doesn't need to setState

  useEffect(() => {
    for (let index = 0; index < 12; index++) {
      //TODO: move into crystal clock compon
      setLightPillars(prev => [...prev, <CrystalPillar
        position={[
          (Math.cos(radian_interval * index) * radius),
          (Math.sin(radian_interval * index) * radius),
          0
        ]}
        rotation-z={(.52 * index) + 1.64}
        index={index}
      />]);
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
    />]);
  }, []);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime() / 8;
    clockRef.current.rotation.y = a;
  });

  return (
    <group position={[-1.5, .25, -1.5]} ref={clockRef}>
      {lightPillars}
      <LightOrbs />
    </group>
  );
};

export default CrystalClock;