import { Cloud, useTexture, useProgress, Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react";
import { Color, MathUtils } from "three";
import ColorSpheres from "./ColorSpheres";
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

  scene.background = new Color("#0c0c0c")
  camera.rotateZ(-0.025)

  useFrame(() => {
    if (camera.rotation._z <= 0.14) {
      const lerpValue = MathUtils.lerp(0.0001, 5, .00045)
      camera.rotateZ(lerpValue)
    } else {
      const lerpValueRotation = MathUtils.lerp(0.0025, 5, .001)
      const lerpValueZ = MathUtils.lerp(-0.0275, -4.5, .045)

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
      <meshStandardMaterial map={stoneTexture} opacity={1} />
    </mesh>
  )
}

const IntroScene = ({ nextScene }) => {
  const cloudRef = useRef()
  const pillarCount = useRef(0);
  const blockHeights = useRef([]);
  const pillarPositions = useRef(new Set())
  const [pillars, setPillars] = useState([])
  // const audioLoader = useLoader()

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

  function Loader() {
    const { progress } = useProgress()
    // if (progress === 100) {
    //   const audio = new Audio("ps2_startup_sound_effect.mp4")
    //   console.log(audio.play().then(console.log("audio done")))
    // }
    return <Html center>{progress} % loaded</Html>
  }

  const createPillars = () => {
    return Array.from(pillarPositions.current).map((pos, index) => {
      return (
        <BoxWithTexture scale={[.5, .5, blockHeights.current[index] * .0035]}
          position={[.65 * pos[0], .65 * pos[1], ((blockHeights.current[index] * .0035) / 2)]} />
      )
    })
  }

  const playAudio = () => { // Have to make an disclaimer thingy before this because of google policy not allowing audio to play right away. Hard to debug right now
    const audio = new Audio("ps2_startup_sound_effect.mp4")
    audio.play().then(() => {
      console.log("finished")
    })

    console.log(audio.onau)
  }

  return (
    <>
      <div className="fadeout-intro"></div>
      <div className="sony text-shadow fadeInOut">Sony Computer Enterainment</div>
      <Canvas camera={{ position: [0, 0, 8.5], far: 100, near: .1 }}>
        {/* <ArcballControls /> */}
        <GlassBoxes />
        <ColorSpheres />
        <pointLight args={["white", .75, 10, 3]} position={[0, -0.4, 5]} />
        <pointLight args={["white", .5, 10, 2.5]} position={[5, -0.4, 5]} />
        <pointLight args={["white", .25, 10, 2.4]} position={[-4.75, 2, 5]} />
        <pointLight args={["white", .25, 10, 2.4]} position={[6, 1, 4]} />
        {pillars}
        {/* Hard coded pillars to make it look more spread out */}
        <BoxWithTexture
          scale={[.5, .5, 250 * .0035]}
          position={[.65 * 2, .65 * 7, 1]}
        />
        {/* {playAudio()} */}
        <group ref={cloudRef}>
          <Cloud position={[0, 0, -.5]} speed={.35} opacity={.32} depth={.2} width={14.25} segments={40} color="blue" />
          <Cloud position={[0, 0, -3.25]} speed={.25} opacity={.20} depth={.52} width={3.25} color="blue" />
          <Cloud position={[2, 0, -3.25]} speed={.25} opacity={.44} depth={.52} width={8.5} color="blue" />
          <Cloud position={[0, 0, -3.25]} speed={1.55} opacity={.7} depth={.52} width={10.5} color="blue" />
          <Cloud position={[.2, 0, -3.25]} speed={.15} opacity={.7} depth={.52} width={20.5} color="#0c0c0c" />
          <Cloud position={[-.2, -2, -3.25]} speed={.15} opacity={.7} depth={.52} width={10.5} color="#000000" />
          <Cloud position={[0, 0, -3.25]} speed={.25} opacity={.2} depth={.52} width={30} segments={35} color="#8080EF" />
        </group>
        <SetupScene />
      </Canvas>
    </>
  )

}

export default IntroScene