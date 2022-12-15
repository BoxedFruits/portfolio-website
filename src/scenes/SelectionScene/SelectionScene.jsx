import './SelectionSceneStyles'
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';
import { useState } from 'react';

const SceneSetup = () => {
  const { scene } = useThree();
  scene.background = new Color('#000000');
};

const SelectionText = () => {
  const [isHighlighted, setIsHighLighted] = useState();

  return (
    <div style={{ position: 'absolute', zIndex: '1' }}>
      <h1 className='selection-name'>
        Browser
      </h1>
      <h1 className='selection-name'>
        System Configuration
      </h1>
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