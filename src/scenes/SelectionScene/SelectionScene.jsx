import './SelectionSceneStyles.css'
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';
import { useState } from 'react';

const Highlight = {
  Browser: {
    title: "Browser"
  },
  SystemConfig : {
    title: "System Configuration"
  }
}

const SceneSetup = () => {
  const { scene } = useThree();
  scene.background = new Color('#000000');
};

const SelectionText = ({ nextScene }) => {
  const [currHighlighted, setCurrHighLighted] = useState(Highlight.Browser.title);
  return (
    <div className="selection-text-container">
      <button className="transparent-button"
        onClick={() => nextScene()}
      >
        <p
          className={`arial-lighter ${currHighlighted === Highlight.Browser.title ? 'highlight' : 'not-highlighted'}`}
          style={{fontSize: "3.25em", marginBottom: "10px" }}
          onMouseEnter={() => setCurrHighLighted(Highlight.Browser.title)}>
          {Highlight.Browser.title}
        </p>
      </button>
      <button className="transparent-button">
        <p
          className={`arial-lighter ${currHighlighted === Highlight.SystemConfig.title ? 'highlight': 'not-highlighted' }`}
          style={{ fontSize: "3.25em", marginBottom: "10px", marginTop: "0px"}}
          onMouseEnter={() => setCurrHighLighted(Highlight.SystemConfig.title)}>
          {Highlight.SystemConfig.title}
        </p>
      </button>
    </div>
  );
}

const SelectionScene = ({ nextScene }) => {
  return (
    <>
      <SelectionText nextScene={nextScene} />
      <Canvas>
        <SceneSetup />
        <OrbitControls />
        <ambientLight args={[0xff0000]} intensity={0.1}></ambientLight>
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
      </Canvas>
    </>
  );
};

export default SelectionScene;