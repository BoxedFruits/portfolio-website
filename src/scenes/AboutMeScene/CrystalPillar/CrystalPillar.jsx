const CrystalPillar = ({isGlowing , ...props}) => {
  // props will determine how much the crystal is filled with light
  return (
    <mesh
      {...props}
      scale={!isGlowing ? 1 : 1.02}
    >
      <cylinderGeometry
        args={[.27, .27, !isGlowing ? 3 : 2, 6,60]}
      />
      <meshPhysicalMaterial
        transparent={!isGlowing}
        sheenColor={"#6b65a2"}
        color={!isGlowing ? "#6b68aa": "#87d2e5"}
        emissive={"#403c76"}
        reflectivity={.5}
        specularIntensity={1}
        opacity={!isGlowing ? .75 : 1}
        transmission={!isGlowing ? .2 : 0}
      />
    </mesh>
  )
}

export default CrystalPillar;