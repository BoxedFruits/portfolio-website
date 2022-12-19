import { Canvas, useThree } from "@react-three/fiber";
import { Color } from "three";

const SceneSetup = () => {
  const { scene } = useThree();
  scene.background = new Color('#808080');
};

const MemoryCardSelectionScreen = () => {
  return (
    <>
      <h1 style={{zIndex: 1}}>Memory Card selection2</h1>
      <Canvas>
        <SceneSetup />
      </Canvas>
    </>
  );
}

export default MemoryCardSelectionScreen;