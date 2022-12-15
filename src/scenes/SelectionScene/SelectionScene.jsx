import './SelectionSceneStyles.css'
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';
import { useEffect, useState } from 'react';

const SceneSetup = () => {
  const { scene } = useThree();
  scene.background = new Color('#000000');
};

const SelectionText = () => {
  const [isHighlighted, setIsHighLighted] = useState(undefined);
  // why am i blanking out on a better way to do this. Can probably use enums

  return (
    <div style={{ position: 'absolute', zIndex: '1' }}>
      <button className={`selection-browser ${isHighlighted ? 'highlight' : ''}`} onMouseEnter={(e) => setIsHighLighted(true)}>
        Browser
      </button>
      <button className={`selection-config' ${!isHighlighted && isHighlighted !== undefined ? 'highlight' : ''}`} onMouseEnter={(e) => setIsHighLighted(false)}>
        System Configuration
      </button>
    </div>
  )


}

const SelectionScene = ({ nextScene, prevScene }) => {
  return (
    <>
      <SelectionText />
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