const CrystalPillar = (props) => {
  // props will determine how much the crystal is filled with light
  return (
    <mesh
      {...props}
    >
      <cylinderGeometry
        args={[.27, .27, 3, 6,60]}
      />
      <meshPhysicalMaterial
        transparent
        sheenColor={"#6b65a2"}
        color={"#6b68aa"}
        emissive={"#403c76"}
        reflectivity={.5}
        specularIntensity={1}
        opacity={.75}
        transmission={.2}
      />
    </mesh>
  )
}

export default CrystalPillar;