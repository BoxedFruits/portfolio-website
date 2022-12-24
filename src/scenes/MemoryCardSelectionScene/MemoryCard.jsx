import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const MemoryCard = ({ position, name, file, setCurrHighLighted, currHighlighted, setViewObjects, viewObjects }) => {
  const { scene } = useLoader(GLTFLoader, 'memory_card.glb')
  const myMesh = useRef()
  const copiedScene = useMemo(() => scene.clone(), [scene])
  let startAnimation = false

  useFrame(() => {
    if (startAnimation) {
      myMesh.current.position.z = MathUtils.lerp(myMesh.current.position.z, -100, 0.002);
      myMesh.current.position.x = MathUtils.lerp(myMesh.current.position.x, 0, 0.1);

      myMesh.current.rotation.x = MathUtils.lerp(myMesh.current.rotation.x, 40, 0.00088);
      myMesh.current.rotation.y = MathUtils.lerp(myMesh.current.rotation.y, 45, 0.00009);
      myMesh.current.rotation.z = MathUtils.lerp(myMesh.current.position.z, -50, 0.2);
      setTimeout(() => {
        setViewObjects(true); // R3F will automatically try to destory objects
      }, 1000);
    }
  });

  const HandleClick = (props) => { // Todo: clean this up
    startAnimation = true;
    // setViewObjects(true); // this isn't working for some reason
  }
  // currHighlighted === name will be used for highlighting

  return (

    <primitive
      ref={myMesh}
      center={position}
      position={position}
      rotation-x={0.6}
      object={copiedScene}
      onPointerOver={() => setCurrHighLighted(name)}
      onClick={() => {
        HandleClick(123);
      }}>
    </primitive>

  );
}

export default MemoryCard;