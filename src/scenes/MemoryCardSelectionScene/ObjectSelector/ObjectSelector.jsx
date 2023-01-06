//Create object that when clicked, will show a menu
//Pass in the url for the json file to be used
//Populate scene with objects
//Populate menu with text from json file

import { ArcballControls, Html, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import GlowOrbs from "../../../components/GlowOrbs/GlowOrbs";
import Modal from "../Modal/Modal";
import { VanguardLogo } from "../TitleModels/VanguardLogo";
import "./ObjectSelector.css";
const OBJECTS_IN_ROW = 5;

//TODO: Refactor this to be more flexible. Won't be able to use this for the spinning object in the Modal
//Might be able to combine these two functions with optional parameters and destructuring 
const getModelForSelection = (title, position, index, onHandleAnimation, setOrbPostion) => {
  switch (title) {
    case "Vanguard":
      return <VanguardLogo 
        key={index} 
        position={position} 
        onClick={() => onHandleAnimation()} 
        onPointerOver={() => setOrbPostion()}
        />;
    default: return <Text>uh oh something broke</Text>
  }
}

const getModelForModal = (title, index) => {
  switch (title) {
    case "Vanguard":
      return <VanguardLogo 
        key={index}
        position={[-4.5, -1.25, -1]}
        rotation-x={1.6}
        scale={[.85, .85, .85]}
        shouldRotate={true} />;
    default: return <Text>uh oh something broke</Text>
  }
}

const ObjectSelector = ({ jsonObject, memoryCardName }) => {
  let zValue = 3.25;
  const json = jsonObject;
  const [animateBackground, setAnimateBackground] = useState(false);
  const [orbPostion, setOrbPostion] = useState([-5,-0.5, -.50]);
  const objIndex = useRef(null);
  // console.log(currHighlighted)
  const handleAnimation = (index) => {
    objIndex.current = index;
    setAnimateBackground(true);
  }

  return (
    <>
      {animateBackground &&
        <Canvas className="modal-canvas" style={{ position: "absolute" }}>
          <ArcballControls enableRotate={false} enablePan={false} />
          <Modal
            memoryCardName={memoryCardName}
            data={json.objects[objIndex.current]}
            Model={getModelForModal(json.objects[objIndex.current].title, objIndex.current)}
          />
        </Canvas>
      }
      <Canvas className="object-selector-canvas" camera={{ position: [0, -8, 0] }} style={{ position: "absolute" }}>
        <Html fullscreen>
          <h1 style={{ position: 'absolute', marginLeft: '20px' }}>PS2</h1>
          {/* <h1 style={{ float: 'right', marginRight: '20px' }}>{currHighlighted}</h1> */}
        </Html>
        <ambientLight />
        <GlowOrbs position={orbPostion} />
        {
          json.objects.map((obj, index) => { // TODO: Load models
            if (index % OBJECTS_IN_ROW === 0) zValue -= 3;
            let position = [-5 + (index % OBJECTS_IN_ROW * 2.5), 0, zValue];
            return getModelForSelection(obj.model, position , index, () => handleAnimation(index), () => setOrbPostion([position[0], position[1] - 0.5, position[2] - 0.75]))
          })
        }
      </Canvas>
    </>
  )
}

export default ObjectSelector;