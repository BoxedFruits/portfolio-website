import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, MathUtils } from "three";

const FloatingBoxes = ({ counter, shouldShrink }) => {
  const boxRef1 = useRef();
  const boxRef2 = useRef();
  const boxRef3 = useRef();
  const boxRef4 = useRef();
  const boxRef5 = useRef();
  const TARGET_SCALE = .8;

  const BOX_PARAMS = [
    {
      ref: boxRef1,
      position: [-2, 2.2, 0],
      rotation: [0, 0, 0]
    },
    {
      ref: boxRef2,
      position: [-3.5, 1, 0],
      rotation: [-1, .5, 0]
    },
    {
      ref: boxRef3,
      position: [-1.8, 0, 0],
      rotation: [.8, -1.3, 0]
    },
    {
      ref: boxRef4,
      position: [-3.5, -1.2, 0],
      rotation: [-1.3, .4, 0]
    },
    {
      ref: boxRef5,
      position: [-1.8, -2, 0],
      rotation: [.6, -.5, 0]
    }
  ];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() / 5.2;

    if (boxRef1.current.scale.x <= TARGET_SCALE) {
      const lerpValue = MathUtils.lerp(boxRef1.current.scale.x, TARGET_SCALE, 0.007);

      boxRef1.current.scale.set(lerpValue, lerpValue, lerpValue);
      boxRef2.current.scale.set(lerpValue, lerpValue, lerpValue);
      boxRef3.current.scale.set(lerpValue, lerpValue, lerpValue);
      boxRef4.current.scale.set(lerpValue, lerpValue, lerpValue);
      boxRef5.current.scale.set(lerpValue, lerpValue, lerpValue);
    }

    if (shouldShrink === true && boxRef1.current.scale.x > 0) {
      const lerpValue = MathUtils.lerp(boxRef1.current.scale.x, -.2, 0.03);

      boxRef1.current.scale.set(lerpValue, lerpValue, lerpValue);
      boxRef2.current.scale.set(lerpValue, lerpValue, lerpValue);
      boxRef3.current.scale.set(lerpValue, lerpValue, lerpValue);
      boxRef4.current.scale.set(lerpValue, lerpValue, lerpValue);
      boxRef5.current.scale.set(lerpValue, lerpValue, lerpValue);
    }

    boxRef1.current.rotation.z = -t;
    boxRef1.current.rotation.y = -t / 2;

    boxRef2.current.rotation.z = t;
    boxRef2.current.rotation.y = t / 3;
    boxRef2.current.rotation.x = t / 5.4;

    boxRef3.current.rotation.z = -t;
    boxRef3.current.rotation.y = -t / 2;
    boxRef3.current.rotation.x = t / 2;

    boxRef4.current.rotation.z = -t;
    boxRef4.current.rotation.y = t / 1.5;
    boxRef4.current.rotation.x = -t / 1;

    boxRef5.current.rotation.z = t;
    boxRef5.current.rotation.y = -t;
    boxRef5.current.rotation.x = t / 2;
  });

  return (
    <>
      {
        BOX_PARAMS.map((e, index) => {
          return (
            <mesh
              scale={0}
              ref={e.ref}
              position={e.position}
              rotation={e.rotation}
            >
              <boxGeometry />
              <meshPhysicalMaterial
                side={DoubleSide}
                depthTest={false}
                emissive={"#5D3C76"}
                color={counter === index ? "#00CBFF" : "#a3a3a3"}
                reflectivity={.1}
                specularIntensity={.1}
                transmission={counter === index ? .2 : .35}
                clearcoat={1}
                clearcoatRoughness={1}
              />
            </mesh>
          );
        })
      }
    </>
  );
};

export default FloatingBoxes;