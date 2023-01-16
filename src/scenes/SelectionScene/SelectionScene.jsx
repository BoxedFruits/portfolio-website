import './SelectionSceneStyles.css'
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';
import { useEffect, useRef, useState } from 'react';

const Highlight = {
  Browser: {
    title: "Browser"
  },
  SystemConfig: {
    title: "System Configuration"
  }
}

const SceneSetup = () => {
  const { scene } = useThree();
  scene.background = new Color('#000000');
};

const SelectionText = ({ nextScene }) => {
  const [currHighlighted, setCurrHighLighted] = useState(Highlight.Browser.title);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("selectionSound2.mp3");
  })

  useEffect(() => {
    audioRef.current.play();
  }, [currHighlighted])

  return (
    <>
      {isTextVisible ?
        <div className="selection-text-container">
          <center style={{ marginTop: "10px" }}>
            <p
              className={`arial-lighter selectable-text ${currHighlighted === Highlight.Browser.title ? 'highlight' : 'not-highlighted'}`}
              onClick={() => setIsTextVisible(false)}
              onMouseEnter={() => setCurrHighLighted(Highlight.Browser.title)}>
              {Highlight.Browser.title}
            </p>
            <p
              className={`arial-lighter selectable-text ${currHighlighted === Highlight.SystemConfig.title ? 'highlight' : 'not-highlighted'}`}
              onMouseEnter={() => setCurrHighLighted(Highlight.SystemConfig.title)}>
              {Highlight.SystemConfig.title}
            </p>
          </center>
        </div>
        : <div className="fadein-animation" style={{ color: "red" }} onAnimationEnd={() => nextScene()}>
        </div>}
    </>
  );
}

const SelectionScene = ({ nextScene }) => {
  return (
    <>
      <SelectionText nextScene={nextScene} />
      <Canvas>
        {/* LightOrbs component */}
        <SceneSetup />
        <OrbitControls />
        <ambientLight args={[0xff0000]} intensity={0.1}></ambientLight>
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
      </Canvas>
    </>
  );
};

export default SelectionScene;