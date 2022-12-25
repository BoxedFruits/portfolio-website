//Create object that when clicked, will show a menu
//Pass in the url for the json file to be used
//Populate scene with objects
//Populate menu with text from json file

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";
import "./ObjectSelector.css";

const getAlphaValue = (rgba) => {
  //regex to get alpha
  console.log(rgba)
  // var oldCss = 'rgba(1,1,1,0.3)',
  return rgba.match(/[^,]+(?=\))/gm)[0];
}

const TARGET_ALPHA = .42;

const Modal = ({ animateBackground }) => {
  const htmlRef = useRef()
  //TODO: const background = generateRandomGradient() 

  useFrame((state) => { //State is going to be managed here
    if (animateBackground) {
      const currentAlpha = getAlphaValue(htmlRef.current.getElementsByClassName('modal-background')[0].style.backgroundColor)
      htmlRef.current.getElementsByClassName('modal-background')[0].style.backgroundColor = `rgba(25,255,25, ${MathUtils.lerp(currentAlpha, TARGET_ALPHA, 0.08)})`
    }
  });

  return (
    <Html fullscreen ref={htmlRef}>
      <div className="modal-background" style={{
        display: "block",
        backgroundColor: "rgba(255,10,255,.02)"
      }}>
      </div>
    </Html>
  );
}

const ObjectSelector = () => {
  const [animateBackground, setAnimateBackground] = useState(false);

  return (
    <>
      {animateBackground &&
        <Modal
          animateBackground={animateBackground}
        />
      }
      <mesh
        onClick={() => {
          setAnimateBackground(true)
        }}
      >
        <boxGeometry></boxGeometry>
      </mesh>
    </>
  )
}

export default ObjectSelector;