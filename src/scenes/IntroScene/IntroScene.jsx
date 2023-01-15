import { Cloud, useTexture, ArcballControls, Trail } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react";
import { AdditiveBlending, Color, MathUtils } from "three";
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
      <meshStandardMaterial map={stoneTexture} opacity={1} />
    </mesh>
  )
}

const ColorSpheres = () => {
  const redSphere = useRef()
  const greenSphere = useRef()
  const purpleSphere = useRef()
  const blueSphere = useRef()

  const SCALE = .035
  const RED_COLOR = "#FF043E"
  const PURPLE_COLOR = "#900ff0"
  const GREEN_COLOR = "#007F5C"
  const BLUE_COLOR = "#336693"

  const orbTexture = useTexture("glow.png")
  const SPRITE_CONFIG = {
    map: orbTexture,
    alphaMap: orbTexture,
    transparent: true,
    opacity: 1,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  }

  const sphereData =
    [{
      color: RED_COLOR,
      position: [-.35, .75, 3],
      ref: redSphere
    },
    {
      color: PURPLE_COLOR,
      position: [2.4, -.1, 3],
      ref: purpleSphere
    },
    {
      color: GREEN_COLOR,
      position: [-2.55, -.75, 2.75],
      ref: greenSphere
    },
    {
      color: BLUE_COLOR,
      position: [-1.5, -1.75, 2.75],
      ref: blueSphere
    }
    ];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    redSphere.current.position.x = Math.sin(t / 2.5) * 4
    redSphere.current.position.y = Math.cos(-t)

    greenSphere.current.position.x = Math.sin(t) * 2- 2
    greenSphere.current.position.y = Math.cos(t / Math.PI) - 1

    blueSphere.current.position.x = Math.cos(t)
    blueSphere.current.position.y = Math.sin( 2*t / Math.PI)

    purpleSphere.current.position.x = Math.sin(t / Math.PI) * 4 - 1.5
    purpleSphere.current.position.y = Math.cos(t) * 2
  })

  return (
    <>
      {sphereData.map((sphere) => {
        return (
          <group ref={sphere.ref} position={sphere.position}>
            <sprite
              scale={SCALE + .5}
            >
              <spriteMaterial
                {...SPRITE_CONFIG}
                color={sphere.color}
              />
            </sprite>
            <Trail
              width={1}
              length={10}
              decay={2}
              attenuation={(t) => {
                return (t * t) / 2.2
              }}
              color={sphere.color}
            >
              <mesh scale={SCALE}>
                <sphereGeometry />
                <meshBasicMaterial color={sphere.color} />
              </mesh>
            </Trail>
          </group>
        )
      })}
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
    <Suspense fallback={null}>
      <Canvas camera={{ position: [0, 0, 8.5], far: 100, near: .1 }}>
        <ArcballControls />
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
    </Suspense>
  )

}

export default IntroScene