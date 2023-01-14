import { Cloud, useTexture, ArcballControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react";
import { Color, MathUtils } from "three";
import { GlassBoxes } from "./GlassBoxes";

const SideProjects = require("../MemoryCardSelectionScene/MemoryCards/sideProjects.json")
const WorkExperience = require("../MemoryCardSelectionScene/MemoryCards/workExperience.json")

const getBlockHeights = (file) => {
  return file.objects.map((e) => {
    const startDate = new Date(e.date.start).getTime()
    const endDate = new Date(e.date.end).getTime()
    return (endDate - startDate) / (1000 * 3600 * 24)
  })
}

const getRandomArbitrary = () => {
  return Math.random() * (5 - (-5)) + (-5);
}

const SetupScene = () => {
  const { scene } = useThree();
  const camera = useThree((state) => state.camera);

  scene.background = new Color("black")
  camera.rotateZ(-0.025)

  useFrame(() => {
    if (camera.rotation._z <= 0.14) {
      const lerpValue = MathUtils.lerp(0.0001, 5, .0001)
      camera.rotateZ(lerpValue)
    } else {
      const lerpValueRotation = MathUtils.lerp(0.0025, 5, .0001)
      const lerpValueZ = MathUtils.lerp(-0.0275, 1.5, .0001)

      camera.rotateZ(lerpValueRotation)
      camera.translateZ(lerpValueZ)
    }
  })
}

const BoxWithTexture = (props) => {
  const stoneTexture = useTexture("stoneTexture.jpg");
  return (
    <mesh {...props}>
      <boxGeometry></boxGeometry>
      <meshBasicMaterial map={stoneTexture} />
    </mesh>
  )
}

const IntroScene = ({ nextScene }) => {
  const cloudRef = useRef()
  const pillarCount = useRef(0);
  const blockHeights = useRef([]);
  const pillarPositions = useRef(new Set())
  const [pillars, setPillars] = useState([])

  useEffect(() => {
    blockHeights.current.push(...getBlockHeights(SideProjects))
    blockHeights.current.push(...getBlockHeights(WorkExperience))

    pillarCount.current = blockHeights.current.length

    for (let index = 0; index < pillarCount.current; index++) { //get random position  for pillars
      let randomPosition = [Math.ceil(getRandomArbitrary()), Math.ceil(getRandomArbitrary())]
      while (pillarPositions.current.has(randomPosition)) { //avoid duplicates
        randomPosition = [Math.ceil(getRandomArbitrary()), Math.ceil(getRandomArbitrary())]
      }
      pillarPositions.current.add(randomPosition)
    }
    setPillars(createPillars())
  }, [])

  const createPillars = () => {
    return Array.from(pillarPositions.current).map((pos, index) => {
      return (
        <BoxWithTexture scale={[.5, .5, blockHeights.current[index] * .0035]}
          position={[.65 * pos[0], .65 * pos[1], ((blockHeights.current[index] * .0035) / 2)]} />
      )
    })
  }

  return (
    <Canvas camera={{ position: [0, 0, 8.5] }}>
      <ambientLight intensity={0.01} />
      <ArcballControls />
      <GlassBoxes />
      <directionalLight args={[0x0031f3, 1]} position={[0, 0, 1]} target={cloudRef.current} />
      {pillars}
      {/* Hard coded pillars to make it look more spread out */}
      <BoxWithTexture
        scale={[.5, .5, 250 * .0035]}
        position={[.65 * 2, .65 * 7, 1]}
      />
      <Suspense fallback={null}>
        <group ref={cloudRef}>
          <Cloud position={[0, 0, -.5]} speed={.35} opacity={.12} depth={.2} width={10.25} />
          <Cloud position={[0, 0, -1.5]} speed={.25} opacity={.04} depth={.52} width={2.5} />
          <Cloud position={[2, 0, -1.5]} speed={.25} opacity={.04} depth={.52} width={5.5} />
          <Cloud position={[0, 0, -1.5]} speed={1.55} opacity={.02} depth={.52} width={10.5} />
        </group>
      </Suspense>
      <SetupScene />
    </Canvas>
  )

}

export default IntroScene