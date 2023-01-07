import './SelectionSceneStyles.css'
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';
import { useState } from 'react';

const SceneSetup = () => {
  const { scene } = useThree();
  scene.background = new Color('#000000');
};

const SelectionText = ({ nextScene }) => {
  const [isHighlighted, setIsHighLighted] = useState(true);

  return (
    <div style={{ position: "absolute", zIndex: "1", display: "flex", flexDirection: "column", height: "100%", right: "25%", top: "40%" }}>
      <button
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={() => nextScene()}
      >
        <p
          className={`selection-browser ${isHighlighted ? 'highlight' : ''}`}
          style={{ color: "#5e5a5a", fontFamily: "arial", fontWeight: "lighter", fontSize: "3.25em", marginBottom: "10px" }}
          onMouseEnter={() => setIsHighLighted(true)}>
          Browser
        </p>
      </button>
      <button
        style={{ backgroundColor: "transparent", color: "#5e5a5a", border: "none"}}
      >
        <p
          className={`selection-browser ${isHighlighted ? '': 'highlight' }`}
          style={{ color: "#5e5a5a", fontFamily: "arial", fontWeight: "lighter", fontSize: "3.25em", marginBottom: "10px", marginTop: "0px"}}
          onMouseEnter={() => setIsHighLighted(false)}>
          System Configuration
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