//Create object that when clicked, will show a menu
//Pass in the url for the json file to be used
//Populate scene with objects
//Populate menu with text from json file

import { ArcballControls, Html } from "@react-three/drei";
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
          backgroundColor: "rgba(155,10,255,.02)"
        }}>
        </div>
      </Html>
      <mesh center position={[-5.5, -1.5, -5]}>
        <sphereGeometry></sphereGeometry>
      </mesh>
      <Html transform className="memory-card-body" position={[5.5, 2.5, -10]}>
        <div style={{maxWidth: "24em" }}>
          <p className="memory-card-title">Memory Card <span style={{ fontSize: "16px" }}> (PS2) / </span> {memoryCardName}</p>
          <h1>{title}</h1>
          <p>{date.start}   -   {date.end}</p>
          <p>{memory}</p>
          <p>{summary}</p>
          <ul>
            {
              bulletPoints.map((bullet, index) => {
                return <li key={index} className="memory-card-bulletPoints">{bullet}</li>
              })
            }
          </ul>
        </div>
      </Html>
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
              <ArcballControls enableRotate={false} enablePan={false} />
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