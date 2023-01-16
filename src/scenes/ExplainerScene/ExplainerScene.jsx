// This page is required to make audio autoplay because of google policies.

import "./ExplainerScene.css";

const ExplainerScene = ({nextScene}) => {
  return (
    <div style={{ background: "black", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <center style={{maxWidth: "650px"}}>
        <p style={{ marginTop: "none" }}>
          Hi! My name is Sam and this is my portfolio/online resume website that was inspired by one of my favorite gaming consoles growing up, the PlayStation 2.
        </p>
        <p>
          There are a lot of 3d elements I recreated using React Three Fiber so to experience this website, it is best to use a PC or turn your phone into landscape mode.
        </p>
        
        <i style={{fontSize: "16px"}}>
          I needed to create this page in order to have audio autoplay because of google's autoplay policy so keep your volume on!.
        </i>
        <br />
        <button className="button-18" onClick={() => nextScene()}>Enter</button>
      </center>
    </div>
  )

}

export default ExplainerScene;
