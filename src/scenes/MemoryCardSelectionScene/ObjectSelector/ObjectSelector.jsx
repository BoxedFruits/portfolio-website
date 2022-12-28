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
        {/* Making it a threeJS text doesn't solve the problem, it might actually make it worse because there isn't a gurantee that the aspect ratio of the models will look good. 
            Can still have the text as an actual HTML element that is position absolute on the page and then have the controls still allow for zooming and panning so the user can adjust the page how they like */}
        <Text className="memory-card-name" position={[1, 2, 0]} anchorX="left">{memoryCardName}</Text>
        <Text className="memory-card-title" position={[1, 1.9, 0]}>{title}</Text>
        <Text className="memory-card-dates" position={[1, 1.8, 0]}>{date.start} - {date.end}</Text>
        <Text className="memory-card-memorySize" position={[1, 1.7, 0]}>{memory}</Text>
        <Text className="memory-card-summary" position={[1, 1.6, 0]}>{summary}</Text>
        {
          bulletPoints.map((bullet,index) => {
            return <Text key={index}  className="memory-card-bulletPoints" position={[1, 1.5, 0]}>{bullet}</Text>
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