import BackButton from "../../components/BackButton/BackButton";

const AboutMeScene = ({ prevScene }) => {

  return (
    <>
      <div>
        <p style={{ color: "white", fontSize: "350px", marginTop: "28px", marginBottom: "34px" }}>
          About Me
        </p>
        <p style={{ color: "white", fontSize: "150px", marginTop: "18px" }}>
          Under Construction 🏗️
        </p>
      </div>
      <BackButton onClick={prevScene} />
    </>
  )
}

export default AboutMeScene;