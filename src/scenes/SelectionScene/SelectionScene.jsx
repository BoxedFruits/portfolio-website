import './SelectionSceneStyles.css'
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';
import { useEffect, useRef, useState } from 'react';
import LightOrbs from './LightOrbs';
import { Scenes } from '../../App';

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
  const nextSceneRef = useRef(null);
  const selectedAudioRef = useRef(new Audio("selectionSound1.mp3"));
  const oceanWavesAudioRef = useRef(new Audio("oceanWavesSoundEffect.mp3"))


  const handleClick = (scene) => {
    selectedAudioRef.current.play();
    oceanWavesAudioRef.current.pause();

    nextSceneRef.current = scene;

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
              onClick={() => handleClick(Scenes.MemoryCardSelectionScene)}
              onMouseEnter={() => handleMouseEnter(Highlight.Browser.title)}>
              {Highlight.Browser.title}
            </p>
            <p
              className={`arial-lighter selectable-text ${currHighlighted === Highlight.SystemConfig.title ? 'highlight' : 'not-highlighted'}`}
              onClick={() => handleClick(Scenes.AboutMeScene)}
              onMouseEnter={() => handleMouseEnter(Highlight.SystemConfig.title)}>
              {Highlight.SystemConfig.title}
            </p>
          </center>
        </div>
        : <div className="fadein-animation" style={{ color: "red" }} onAnimationEnd={() => nextScene(nextSceneRef.current)}>
        </div>}
    </>
  );
}

const SelectionScene = ({ nextScene }) => {
  return (
    <>
      <div className="fadeout-animation" onAnimationEnd={(e) => e.target.style.display = "none"}></div>
      <SelectionText nextScene={(e) => nextScene(e)} />
      <Canvas>
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