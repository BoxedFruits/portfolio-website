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

const parseGradientValues = (rgba) => {
  const beginningOfString = rgba.match(/(^.*deg, )/g);
  const percentages = rgba.match(/(\d*%)/g)
  const rgbaValues = rgba.match(/(\d?\d+),/g)
  const currentAlphaVal = rgba.match(/(\d*(\.\d+)?)\)/m)[1]

  return ({ beginningOfString, percentages, rgbaValues, currentAlphaVal })
}

const TARGET_ALPHA = .88;

const Modal = ({ animateBackground, obj, memoryCardName }) => {
  const { title, model, date, summary, memory, bulletPoints, linearGradient } = obj;
  const htmlRef = useRef();

  useFrame(() => {
    if (animateBackground && htmlRef.current !== undefined) {
      const {
        beginningOfString,
        percentages,
        rgbaValues,
        currentAlphaVal
      } = parseGradientValues(htmlRef.current.getElementsByClassName('modal-background')[0].style.background)

      htmlRef.current.getElementsByClassName('modal-background')[0].style.background =
        `${beginningOfString} rgba(${rgbaValues[0]} ${rgbaValues[1]} ${rgbaValues[2]} ${MathUtils.lerp(currentAlphaVal, TARGET_ALPHA, 0.08)}) ${percentages[0]}, rgba(${rgbaValues[3]} ${rgbaValues[4]} ${rgbaValues[5]} ${MathUtils.lerp(currentAlphaVal, TARGET_ALPHA, 0.08)}) ${percentages[1]}, rgba(${rgbaValues[6]} ${rgbaValues[7]} ${rgbaValues[8]} ${MathUtils.lerp(currentAlphaVal, TARGET_ALPHA, 0.08)}) ${percentages[2]})`
    }
  });

  return (
    <>
      <Html zIndexRange={[1, 1]} wrapperClass="modal-background-wrapper" fullscreen ref={htmlRef}>
        <div className="modal-background" style={{
          display: "block",
          background: linearGradient
        }}>
        </div>
      </Html>
      <mesh center position={[-5.5, -1.5, -5]}>
        <sphereGeometry></sphereGeometry>
      </mesh>
      <Html transform className="memory-card-body" position={[5.5, 2.5, -10]}>
        <div style={{ maxWidth: "24em" }}>
          <center>
            <p className="memory-card-title">Memory Card <span style={{ fontSize: "16px" }}> (PS2) / </span> {memoryCardName}</p>
            <h1 style={{ color: "#dddd4e" }} >{title}</h1>
            <p>{date.start}&nbsp; — &nbsp;{date.end}</p>
            <p>{memory}</p>
          </center>
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