import { ArcballControls, Html, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import GlowOrb from "../../../components/GlowOrb/GlowOrb";
import Modal from "../Modal/Modal";
import { VanguardLogo } from "../TitleModels/VanguardLogo";
import "./ObjectSelector.css";
const OBJECTS_IN_ROW = 5;

//TODO: Refactor this to be more flexible. Won't be able to use this for the spinning object in the Modal
//Might be able to combine these two functions with optional parameters and destructuring 
const getModelForSelection = (title, position, index, onHandleAnimation, setOrbPosition, setCurrHighLighted, getRef, animateNextObject) => {
  switch (title) {
    case "Vanguard":
      return <VanguardLogo
        key={index}
        position={position}
        onClick={() => onHandleAnimation()}
        onPointerOver={() => {
          setOrbPosition();
          setCurrHighLighted();
        }}
        getRef={getRef}
        targetScale={.55}
        animationCallback={() => animateNextObject()} //this is what will move the count to the next object to animate
      />;
    default: return <Text>uh oh something broke</Text>
  }
}

const getModelForModal = (title, index, getRef) => {
  switch (title) {
    case "Vanguard":
      return <VanguardLogo
        key={index}
        position={[-4.5, -1.25, -1]}
        rotation-x={1.6}
        targetScale={.85}
        shouldRotate={true}
        loadAnimation={(e) => e.current.startLoadingAnimation()}
        getRef={getRef}
      />;
    default: return <Text>uh oh something broke</Text>
  }
}

const ObjectSelector = ({ jsonObject, memoryCardName }) => {
  const [animateBackground, setAnimateBackground] = useState(false);
  const [orbPosition, setOrbPosition] = useState([-5, -0.5, -.50]);
  const [currHighlighted, setCurrHighLighted] = useState(jsonObject.objects[0].title)
  const [objectsToRender, setObjectsToRender] = useState([]);
  const [animatedObjectsCounter, setAnimatedObjectsCounter] = useState(0); // Keeps track of which object to animate
  const [finishedLoadingAnimation, setFinishedLoadingAnimation] = useState(false);
  const [objectRefs, setObjectRefs] = useState([])
  const [modalObjectRef, setModalObjectRef] = useState();

  const selectAudioRef = useRef(new Audio("selectionSound1.mp3"));
  const objIndex = useRef(null);
  const lastOrbPosition = useRef(orbPosition);

  const handleAnimation = () => {
    setAnimateBackground(true);
  }

  useEffect(() => {
    let zValue = 3.25;

    const objects = jsonObject.objects.map((obj, index) => {
      if (index % OBJECTS_IN_ROW === 0) zValue -= 3;
      let position = [-5 + (index % OBJECTS_IN_ROW * 2.5), 0, zValue];

      return getModelForSelection(
        obj.model,
        position,
        index,
        () => {
          handleAnimation();
          selectAudioRef.current.play()
        },
        () => setOrbPosition([position[0], position[1] - 0.45, position[2] - 0.75]),
        () => {
          objIndex.current = index;
          setCurrHighLighted(obj.title)
        },
        (e) => setObjectRefs(objectRefs => ([...objectRefs, e])),
        () => setAnimatedObjectsCounter(index + 1)
      )
    })
    setObjectsToRender(objects);

  }, [])

  useEffect(() => {
    if (objectRefs[0]?.current) { // Start the loading animations
      objectRefs[0].current.startLoadingAnimation();
      setFinishedLoadingAnimation(false);
    }
  }, [objectRefs])

  useEffect(() => {
    if (objectRefs[animatedObjectsCounter]?.current) {
      objectRefs[animatedObjectsCounter].current.startLoadingAnimation()
    }

    if (objectRefs.length > 0 && animatedObjectsCounter >= objectRefs.length) {
      setFinishedLoadingAnimation(true);
    }
  }, [animatedObjectsCounter])

  useEffect(() => {
    if (JSON.stringify(lastOrbPosition.current) !== JSON.stringify(orbPosition)) {
      const highlightAudio = new Audio("selectionSound2.mp3");
      highlightAudio.play();
      lastOrbPosition.current = orbPosition
    }
  }, [orbPosition])

  return (
    <>
      {!finishedLoadingAnimation &&
        <div className="text-shadow loading-text"> Now Loading...</div>
      }
      {
        animateBackground &&
        <Canvas className="modal-canvas" style={{ position: "absolute" }}>
          <ArcballControls enableRotate={false} enablePan={false} />
          <Modal
            memoryCardName={memoryCardName}
            data={jsonObject.objects[objIndex.current]}
            Model={getModelForModal(jsonObject.objects[objIndex.current].model, objIndex.current, (e) => setModalObjectRef(e))}
            shrinkModel={() => modalObjectRef.current.triggerShrinkAnimation()}
            closeModal={() => setAnimateBackground(false)}
          />
        </Canvas>
      }
      <Canvas className="object-selector-canvas" camera={{ position: [0, -8, 0] }} style={{ position: "absolute", pointerEvents: !finishedLoadingAnimation ? "None" : "auto" }}>
        <Html fullscreen style={{ display: animateBackground ? "none" : "block" }}>
          <p className="memory-card-title text-shadow" style={{ fontSize: "32px", color: "#dfdbdb", position: "absolute", marginLeft: "24px", pointerEvents: "None" }}>
            Memory Card
            <span style={{ fontSize: "24px" }}> (PS2) &nbsp;/</span>
            &nbsp;{memoryCardName}
            <p style={{ marginTop: "0px", fontSize: "24px" }}>46,341 KB FREE</p>
          </p>
          <h1 className="text-shadow arial-lighter title" style={{ float: 'right', marginRight: '24px', pointerEvents: "None" }}>{currHighlighted}</h1>
        </Html>
        <ambientLight />
        <GlowOrb position={orbPosition} onClick={() => handleAnimation()} />
        {objectsToRender}
      </Canvas>
    </>
  )
}

export default ObjectSelector;