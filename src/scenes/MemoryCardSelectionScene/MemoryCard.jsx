import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const MemoryCard = ({ position, name, file, setCurrHighLighted, currHighlighted, setViewObjects }) => {
  const { scene } = useLoader(GLTFLoader, 'memory_card.glb')
  const copiedScene = useMemo(() => scene.clone(), [scene])

  // currHighlighted === name will be used for highlighting

  return (
    <group>
      <primitive
        onPointerOver={() => setCurrHighLighted(name)} 
        position={position}
        onClick={() => {setViewObjects(true);}}
        object={copiedScene}>
      </primitive>
    </group>
  );
}

export default MemoryCard;