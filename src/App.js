//AppJS will hold state and determine what gets rendered
//Make sure to have ability to go back and forth scenes

import './App.css';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';

function SceneSetup () {
    const { scene } = useThree();
    scene.background = new Color("#000000");
}

// function TextStuff () {
//     return(<h1 style={{position:'absolute'}}>Hello</h1>)
// }

function App() {
  return (
    <div className="App">
      <Canvas>
      <SceneSetup />
        <OrbitControls></OrbitControls>
        <mesh>
          <sphereBufferGeometry position={[0, 0, 0]} />
          <meshPhongMaterial color={"royalblue"} />
        </mesh>
        <mesh position={[0, 0, 1]}>
          <planeGeometry />
          <meshPhongMaterial color={'pink'} />
        </mesh>
        <ambientLight args={[0xff0000]} intensity={0.1}></ambientLight>
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
      </Canvas>
    </div>
  );
}

export default App;
