import { Trail, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { AdditiveBlending } from "three"

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

    greenSphere.current.position.x = Math.sin(t) * 2 - 2
    greenSphere.current.position.y = Math.cos(t / Math.PI) - 1

    blueSphere.current.position.x = Math.cos(t)
    blueSphere.current.position.y = Math.sin(2 * t / Math.PI)

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

export default ColorSpheres;