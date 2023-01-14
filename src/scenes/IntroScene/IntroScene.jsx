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
              length={20}
              decay={0.1}
              attenuation={(t) => {
                return (t * t) / 2
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
      <Canvas camera={{ position: [0, 0, 8.5] }}>
        <ambientLight intensity={0.01} />
        <ArcballControls />
        <GlassBoxes />
        <ColorSpheres />
        <directionalLight args={[0x0031f3, 1]} position={[0, 0, 1]} target={cloudRef.current} />
        {pillars}
        {/* Hard coded pillars to make it look more spread out */}
        <BoxWithTexture
          scale={[.5, .5, 250 * .0035]}
          position={[.65 * 2, .65 * 7, 1]}
        />
          <group ref={cloudRef}>
            <Cloud position={[0, 0, -.5]} speed={.35} opacity={.12} depth={.2} width={10.25} />
            <Cloud position={[0, 0, -1.5]} speed={.25} opacity={.04} depth={.52} width={2.5} />
            <Cloud position={[2, 0, -1.5]} speed={.25} opacity={.04} depth={.52} width={5.5} />
            <Cloud position={[0, 0, -1.5]} speed={1.55} opacity={.02} depth={.52} width={10.5} />
          </group>
        <SetupScene />
      </Canvas>
    </Suspense>
  )

}

export default IntroScene