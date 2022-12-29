//Create object that when clicked, will show a menu
//Pass in the url for the json file to be used
//Populate scene with objects
//Populate menu with text from json file

import { ArcballControls, Html, OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";
import { CAMERA_POSITION } from "../MemoryCardSelectionScene";
import "./ObjectSelector.css";

const getAlphaValue = (rgba) => {
  //regex to get alpha
  console.log(rgba)
  return rgba.match(/[^,]+(?=\))/gm)[0];
}

const TARGET_ALPHA = .42;

const Modal = ({ animateBackground, obj, memoryCardName }) => {
  console.log(memoryCardName)
  const { title, model, date, summary, memory, bulletPoints } = obj;

  const htmlRef = useRef();
  //TODO: const background = generateRandomGradient() 
  useFrame(() => {
    if (animateBackground && htmlRef.current !== undefined) {
      const currentAlpha = getAlphaValue(htmlRef.current.getElementsByClassName('modal-background')[0].style.backgroundColor)
      htmlRef.current.getElementsByClassName('modal-background')[0].style.backgroundColor =
        `rgba(25,255,25, ${MathUtils.lerp(currentAlpha, TARGET_ALPHA, 0.08)})`;
    }
  });

  return (
    <>
      <Html zIndexRange={[1, 1]} wrapperClass="modal-background-wrapper" fullscreen ref={htmlRef}>
        <div className="modal-background" style={{
          display: "block",
          backgroundColor: "rgba(255,10,255,.02)"
        }}>
        </div>
      </Html>
      <group>
        <Text className="memory-card-name" position={[1, 2, 0]} fontSize={.34}>Memory Card (PS2)/{memoryCardName}</Text>
        <Text className="memory-card-title" position={[1, 1.4, 0]} color="yellow" fontSize={.5}>{title}</Text>
        <Text className="memory-card-dates" position={[1, .90, 0]} fontSize={.23}>{date.start}   -   {date.end}</Text>
        <Text className="memory-card-memorySize" position={[1, .64, 0]} fontSize={.23}>{memory}</Text>
        <Text className="memory-card-summary" position={[1, -.05, 0]} maxWidth={5.8} fontSize={.23}>{summary}</Text>
        {/* TODO: find way to make the bulletpoints spacing dynamic. Easiest solution would be to make it one big blob of text */}
        {
          bulletPoints.map((bullet,index) => {
            return <Text key={index} className="memory-card-bulletPoints" maxWidth={5.8} position={[1, -0.85 - (index * .80) , 0]} fontSize={.23} textAlign='left'>{bullet}</Text>
          })
        }
      </group>
      <mesh center position={[-5.5, -1.5, -2]}>
        <sphereGeometry></sphereGeometry>
      </mesh>

    </>
  );
}

const ObjectSelector = ({ jsonObject, memoryCardName }) => {
  const json = jsonObject;
  const [animateBackground, setAnimateBackground] = useState(false);

  return (
    <>
      {animateBackground &&
        json.objects.map((obj) => {
          return (
            <Canvas className="modal-canvas" camera={[0, 0, 0]} style={{ position: "absolute" }}>
              <ArcballControls enableRotate={false} enablePan={true}/>
              <Modal
                memoryCardName={memoryCardName}
                obj={obj}
                animateBackground={animateBackground} />
            </Canvas>)
        })
      }
      <Canvas className="object-selector-canvas" camera={CAMERA_POSITION} style={{ position: "absolute" }}>
        <mesh
          onClick={() => {
            setAnimateBackground(true)
          }}
        >
          <boxGeometry></boxGeometry>
        </mesh>
      </Canvas>
    </>
  )
}

export default ObjectSelector;