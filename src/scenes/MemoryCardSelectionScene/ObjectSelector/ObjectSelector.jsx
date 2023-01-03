//Create object that when clicked, will show a menu
//Pass in the url for the json file to be used
//Populate scene with objects
//Populate menu with text from json file

import { ArcballControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { VanguardLogo } from "../TitleModels/VanguardLogo";
import "./ObjectSelector.css";

const OBJECTS_IN_ROW = 5;

//TODO: Refactor this to be more flexible. Won't be able to use this for the spinning object in the Modal
const getModelForSelection = (title, position, index, onHandleAnimation) => {
  switch(title){
    case "Vanguard": 
      return <VanguardLogo key={index} position={position} onClick={() => onHandleAnimation()} />;
    default: return <Text>uh oh something broke</Text>
  }
}

const getModelForModal = (title, index) => {
  console.log("getModelForModal ", title, index)
  switch(title){
    case "Vanguard": 
      return <VanguardLogo key={index} position={[-4.5, -1.5, -1]} rotation-x={1.6} scale={[.85, .85, .85]} shouldRotate={true} />; //rotation
    default: return <Text>uh oh something broke</Text>
  }
}

const ObjectSelector = ({ jsonObject, memoryCardName }) => {
  const json = jsonObject;
  const [animateBackground, setAnimateBackground] = useState(false);
  const objIndex = useRef(null);
  let zValue = 3.25;

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
        <ambientLight />
        {
          json.objects.map((obj, index) => { // TODO: Load models
            if (index % OBJECTS_IN_ROW === 0) zValue -= 3;
            return getModelForSelection(obj.title, [-5 + (index % OBJECTS_IN_ROW * 2.5), 0, zValue], index, () => handleAnimation(index))
          })
        }
      </Canvas>
    </>
  )
}

export default ObjectSelector;