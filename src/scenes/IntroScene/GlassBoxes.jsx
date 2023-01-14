import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const GlassBoxes = () => {
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
  useFrame(({ clock }) => {
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
        position={[-3, 3, 2.75]}
        center={[-3, 3, 2.75]}
        rotation={[-4.25, -2.2, 1.25]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
      <mesh
        ref={boxRef2}
        scale={SCALE}
        position={[-2.55, -1.75, 2.75]}
        rotation={[.01, -.15, -.15]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
      <mesh
        ref={boxRef3}
        scale={SCALE}
        position={[3, 3, 2.75]}
        rotation={[.05, .05, .5]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
      <mesh
        ref={boxRef4}
        scale={.35}
        position={[3, -.1, 2.75]}
        rotation={[.04, -.15, -.16]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
      <mesh
        ref={boxRef5}
        scale={.6}
        position={[-.35, .75, 2.75]}
        rotation={[.15, .25, -.28]}
      >
        <boxGeometry />
        <MeshTransmissionMaterial
          {...transmissionMaterialConfig}
        />
      </mesh>
    </>
  )
}
