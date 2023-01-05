
const GlowOrbs = (props) => {
  return (
    <mesh position={[0, 0, 0]} {...props} scale={.6}>
      <sphereGeometry />
      <meshPhongMaterial
        color='white'
        emissive='white'
        emissiveIntensity={1.25}
        toneMapped={false}
      />
    </mesh>
  )
}

export default GlowOrbs;