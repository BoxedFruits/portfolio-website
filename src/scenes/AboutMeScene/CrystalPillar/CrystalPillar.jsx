import { Html, Text } from "@react-three/drei";

const CrystalPillar = (props) => {
  // props will determine how much the crystal is filled with light
  return (
    <mesh
      {...props}
    >
      <cylinderGeometry
        args={[.2, .2,4, 5]}
      />
      <meshNormalMaterial />
    </mesh>
  )

}

export default CrystalPillar;