import { ArcballControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react";

const SideProjects = require("../MemoryCardSelectionScene/MemoryCards/sideProjects.json")
const WorkExperience = require("../MemoryCardSelectionScene/MemoryCards/workExperience.json")

const GRID_SIZE = 7;

const getBlockHeights = (file) => {
  return file.objects.map((e) => {
    const startDate = new Date(e.date.start).getTime()
    const endDate = new Date(e.date.end).getTime()
    return (endDate - startDate) / (1000 * 3600 * 24)
  })
}

const getRandomArbitrary = () => {
  return Math.random() * (4 - (-4)) + (-4);
}

const IntroScene = ({ nextScene }) => {
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
    return Array.from(pillarPositions.current).map((pos,index) => {
      return (
        <mesh scale={[.5,.5, blockHeights.current[index] * .0035]} position={[.65 * pos[0], .65 * pos[1], ((blockHeights.current[index] * .0035) / 2)]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      )
    })
  }


  return (
    <Canvas>
      <ArcballControls />
      <ambientLight />
      {pillars}
    </Canvas>
  )

}

export default IntroScene