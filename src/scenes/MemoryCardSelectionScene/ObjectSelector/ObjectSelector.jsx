import { ArcballControls, Html, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
import GlowOrb from "../../../components/GlowOrb/GlowOrb";
import Modal from "../Modal/Modal";
import { NasdaqLogo } from "../3dModels/Nasdaq";
import { VanguardLogo } from "../3dModels/VanguardLogo";
import "./ObjectSelector.css";
import { Dumbbell } from "../3dModels/Dumbbell";
import { Ethereum } from "../3dModels/Ethereum";
import { CodeArenaLogo } from "../3dModels/CodeArenaLogo";
import { PenAndPaper } from "../3dModels/PenAndPaper";
import BackButton from "../../../components/BackButton/BackButton";
import { EnableSoundContext } from "../../../App";

const OBJECTS_IN_ROW = 5;

//TODO: Refactor this to be more flexible
//Might be able to combine these two functions with optional parameters and destructuring 
const getModelForSelection = (title, position, index, onHandleAnimation, handlePointerOver, getRef, animateNextObject) => {
  const commonProps = {
    key: index,
    position: position,
    onClick: onHandleAnimation,
    onPointerOver: handlePointerOver,
    getRef: getRef,
    animationCallback: animateNextObject //this is what will move the count to the next object to animate
  };

  switch (title) {
    case "Vanguard":
      return <VanguardLogo
        {...commonProps}
        targetScale={.55}
      />;
    case "Nasdaq":
      return <NasdaqLogo
        {...commonProps}
        targetScale={.5}
      />;
    case "Dumbbell":
      return <Dumbbell
        {...commonProps}
        targetScale={6.5}
      />;
    case "Ethereum":
      return <Ethereum
        {...commonProps}
        targetScale={.7}
      />;
    case "CodeArena":
      return <CodeArenaLogo
        {...commonProps}
        targetScale={.6}
      />;
    case "PenAndPaper":
      return <PenAndPaper
        {...commonProps}
        targetScale={1.8}
      />;
    default: return <Text>uh oh something broke</Text>;
  }
};

const getModelForModal = (title, index, getRef) => {
  const commonProps = {
    key: index,
    position: [-4.5, -1.25, -1],
    shouldRotate: true,
    loadAnimation: (e) => e.current.startLoadingAnimation(),
    getRef: getRef
  };

  switch (title) {
    case "Vanguard":
      return <VanguardLogo
        {...commonProps}
        rotation-x={1.6}
        targetScale={.85}
      />;
    case "Nasdaq":
      return <NasdaqLogo
        {...commonProps}
        rotation-x={1.8}
        targetScale={.8}
      />;
    case "Dumbbell":
      return <Dumbbell
        {...commonProps}
        rotation-x={1.6}
        targetScale={6.5}
      />;
    case "Ethereum":
      return <Ethereum
        {...commonProps}
        rotation-x={-1.58}
        targetScale={1.15}
      />;
    case "CodeArena":
      return <CodeArenaLogo
        {...commonProps}
        rotation-x={-.05}
        targetScale={1}
      />;
    case "PenAndPaper":
      return <PenAndPaper
        {...commonProps}
        rotation-x={1.6}
        targetScale={2.8}
      />;
    default: return <Text>uh oh something broke</Text>;
  }
};

const ObjectSelector = ({ jsonObject, memoryCardName, closeObjectSelector }) => {
  const [animateBackground, setAnimateBackground] = useState(false);
  const [orbPosition, setOrbPosition] = useState([-5, -0.45, 0.5]);
  const [currHighlighted, setCurrHighLighted] = useState(jsonObject.objects[0].title);
  const [objectsToRender, setObjectsToRender] = useState([]);
  const [animatedObjectsCounter, setAnimatedObjectsCounter] = useState(0); // Keeps track of which object to animate
  const [finishedLoadingAnimation, setFinishedLoadingAnimation] = useState(false);
  const [objectRefs, setObjectRefs] = useState([]);
  const [modalObjectRef, setModalObjectRef] = useState();

  const selectAudioRef = useRef(new Audio("selectionSound1.mp3"));
  const { isMuted, _ } = useContext(EnableSoundContext);
  const objIndex = useRef(0);
  const lastOrbPosition = useRef(orbPosition);

  const handleAnimation = () => {
    setAnimateBackground(true);
  };

  const handleAnimationAndPlayAudio = () => {
    handleAnimation();
    selectAudioRef.current.play();
  };

  const handlePointerOver = (index, position, title) => {
    objIndex.current = index;
    setOrbPosition([position[0], position[1] - 0.45, position[2] - 0.75]);
    setCurrHighLighted(title);
  };

  const updateObjectRefs = (e) => {
    setObjectRefs(objectRefs => ([...objectRefs, e]));
  };

  const incrementAnimatedObjectsCounter = (index) => {
    setAnimatedObjectsCounter(index + 1);
  };

  useEffect(() => {
    let zValue = 4.25;

    const objects = jsonObject.objects.map((obj, index) => {
      if (index % OBJECTS_IN_ROW === 0) zValue -= 3;
      let position = [-5 + (index % OBJECTS_IN_ROW * 2.5), 0, zValue];

      selectAudioRef.current.muted = isMuted;

      return getModelForSelection(
        obj.model,
        position,
        index,
        handleAnimationAndPlayAudio,
        () => handlePointerOver(index, position, obj.title),
        updateObjectRefs,
        () => incrementAnimatedObjectsCounter(index)
      );
    });
    setObjectsToRender(objects);

  }, []);

  useEffect(() => {
    if (objectRefs[0]?.current) { // Start the loading animations
      objectRefs[0].current.startLoadingAnimation();
      setFinishedLoadingAnimation(false);
    }
  }, [objectRefs]);

  useEffect(() => {
    if (objectRefs[animatedObjectsCounter]?.current) {
      objectRefs[animatedObjectsCounter].current.startLoadingAnimation();
    }

    if (objectRefs.length > 0 && animatedObjectsCounter >= objectRefs.length) {
      setFinishedLoadingAnimation(true);
    }
  }, [animatedObjectsCounter]);

  useEffect(() => {
    if (JSON.stringify(lastOrbPosition.current) !== JSON.stringify(orbPosition)) {
      const highlightAudio = new Audio("selectionSound2.mp3");

      highlightAudio.muted = isMuted;
      highlightAudio.play();

      lastOrbPosition.current = orbPosition;
    }
  }, [orbPosition]);

  return (
    <>
      {!finishedLoadingAnimation ? (
        <div className="text-shadow loading-text"> Now Loading...</div>
      ) : (
        <>
          {!animateBackground && <BackButton onClick={closeObjectSelector} />}
          {animateBackground && (
            <>
              <Canvas className="modal-canvas" style={{ position: "absolute" }}>
                <ArcballControls enableRotate={false} enablePan={false} />
                <ambientLight />
                {
                  getModelForModal(
                    jsonObject.objects[objIndex.current].model,
                    objIndex.current,
                    (e) => setModalObjectRef(e))
                }
              </Canvas>
              <Modal
                memoryCardName={memoryCardName}
                data={jsonObject.objects[objIndex.current]}
                shrinkModel={() => modalObjectRef.current.triggerShrinkAnimation()}
                closeModal={() => setAnimateBackground(false)}
              />
            </>
          )}
        </>
      )}
      <Canvas className="object-selector-canvas" camera={{ position: [0, -8, 0] }} style={{ pointerEvents: !finishedLoadingAnimation ? "None" : "auto" }}>
        <Html fullscreen style={{ display: animateBackground ? "none" : "block" }}>
          <p className="memory-card-title text-shadow">
            Memory Card
            <span className="ps2"> (PS2) &nbsp;/</span>
            &nbsp;{memoryCardName}
            <p className="freespace">46,341 KB FREE</p>
          </p>
          <p className="text-shadow arial-lighter title memory-card-highlighted">{currHighlighted}</p>
        </Html>
        <ambientLight />
        <GlowOrb position={orbPosition} onClick={() => handleAnimation()} />
        {objectsToRender}
      </Canvas>
    </>
  );
};

export default ObjectSelector;