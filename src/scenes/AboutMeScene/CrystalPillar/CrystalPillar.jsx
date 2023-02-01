const CrystalPillar = (props) => {
  // props will determine how much the crystal is filled with light
  return (
    <mesh
      {...props}
    >
      <cylinderGeometry
        args={[.27, .27, 3, 6]}
      />
      <meshNormalMaterial />
    </mesh>
  )

}

export default CrystalPillar;