import './SelectionSceneStyles.css'
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';
import { useEffect, useRef, useState } from 'react';
import LightOrbs from './LightOrbs';

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
  const selectedAudioRef = useRef(new Audio("selectionSound1.mp3"));
  const oceanWavesAudioRef = useRef(new Audio("oceanWavesSoundEffect.mp3"))
  

  const handleClick = () => {
    selectedAudioRef.current.play();
    oceanWavesAudioRef.current.pause();
    setIsTextVisible(false);
  }

  const handleMouseEnter = (title) => {
    const highlightedAudio = new Audio("selectionSound2.mp3");
    highlightedAudio.play()
    setCurrHighLighted(title)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      oceanWavesAudioRef.current.play();
    }, 3500)

    return () => {
      oceanWavesAudioRef.current.pause()
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {isTextVisible ?
        <div className="selection-text-container">
          <center style={{ marginTop: "10px" }}>
            <p
              className={`arial-lighter selectable-text ${currHighlighted === Highlight.Browser.title ? 'highlight' : 'not-highlighted'}`}
              onClick={() => handleClick()}
              onMouseEnter={() => handleMouseEnter(Highlight.Browser.title)}>
              {Highlight.Browser.title}
            </p>
            <p
              className={`arial-lighter selectable-text ${currHighlighted === Highlight.SystemConfig.title ? 'highlight' : 'not-highlighted'}`}
              onMouseEnter={() => handleMouseEnter(Highlight.SystemConfig.title)}>
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
        <LightOrbs />
        <SceneSetup />
        <OrbitControls />
        <ambientLight args={[0xff0000]} intensity={0.1}></ambientLight>
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
      </Canvas>
    </>
  );
};

export default SelectionScene;