import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color } from 'three';

const SceneSetup = () => {
  const { scene } = useThree();
  scene.background = new Color("#000000");
}

const SelectionScene = ({ nextScene, prevScene }) => {
  return (
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
    </Canvas>)
};

export default SelectionScene;