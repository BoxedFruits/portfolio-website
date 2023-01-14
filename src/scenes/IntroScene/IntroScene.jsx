import { Cloud, useTexture, MeshTransmissionMaterial, ArcballControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react";
import { Color, MathUtils } from "three";

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
      const lerpValueZ = MathUtils.lerp(-0.0275, 1.5 , .0001)

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

const GlassBoxes = () => {
  const boxRef1 = useRef();
  const boxRef2 = useRef();
  const boxRef3 = useRef();
  const boxRef4 = useRef();
  const boxRef5 = useRef();
  const SCALE = .65;

  const transmissionMaterialConfig = {
    attenuationColor: "#ffffff",
    color: "#b1b1b1",
    thickness: "2",
    ior: "2",
  }
  useFrame(({clock}) => {
    const t = clock.getElapsedTime() / 5.2
    boxRef1.current.rotation.z = -t
    boxRef1.current.rotation.y = t / 2
    
    boxRef2.current.rotation.z = -t
    boxRef2.current.rotation.y = -t * 1.4
    boxRef2.current.rotation.x = t 
    
    boxRef3.current.rotation.z = -t
    boxRef3.current.rotation.y = t / 2

    boxRef4.current.rotation.z = -t
    boxRef4.current.rotation.y = t / 2
    boxRef4.current.rotation.x = t / 2

    boxRef5.current.rotation.z = t
    boxRef5.current.rotation.y = -t
    boxRef5.current.rotation.x = t / 2

  })


  return (
    <>
      <mesh
        ref={boxRef1}
        scale={SCALE}
        position={[-3,3,2.75]}
        center={[-3,3,2.75]}
        rotation={[-4.25,-2.2,1.25]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
      <mesh
        ref={boxRef2}
        scale={SCALE}
        position={[-2.55,-1.75,2.75]}
        rotation={[.01,-.15,-.15]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
      <mesh
        ref={boxRef3}
        scale={SCALE}
        position={[3,3,2.75]}
        rotation={[.05,.05,.5]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
      <mesh
        ref={boxRef4}
        scale={.35}
        position={[3,-.1,2.75]}
        rotation={[.04,-.15,-.16]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
      <mesh
        ref={boxRef5}
        scale={.6}
        position={[-.35,.75,2.75]}
        rotation={[.15,.25,-.28]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
    </>

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