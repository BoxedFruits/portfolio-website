// This page is required to make audio autoplay because of google policies.

import { useContext } from "react";
import "./ExplainerScene.css";
import { EnableSoundContext } from "../../App";

const ExplainerScene = ({ nextScene }) => {
  const {isMuted, setIsMuted} = useContext(EnableSoundContext);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div style={{ background: "black", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <center style={{ maxWidth: "650px" }}>
        <p style={{ marginTop: "none" }}>
          Hi! My name is Sam and this is my portfolio/online resume website that was inspired by one of my favorite gaming consoles growing up, the PlayStation 2.
        </p>
        <p>
          There are a lot of 3d elements I recreated using React Three Fiber so to experience this website, it is best to use a PC or turn your phone into landscape mode.
        </p>

        <i style={{ fontSize: "16px" }}>
          I needed to create this page in order to have audio autoplay because of google's autoplay policy so keep your volume on!
        </i>
        <br />
        <button className="button-18" onClick={() => nextScene()}>Enter</button>
      </center>
      <button style={{ backgroundColor: 'transparent', border: '1px solid white', borderRadius: '50%', width: '2rem', height: '2rem', marginLeft: '0.5rem' }} onClick={toggleMute}>
          <svg style={{ fill: 'white', width: '1.5rem', height: '1.5rem', margin: 'auto' }} viewBox="0 0 24 24">
            {isMuted ? (
              <path d="M7 9v6h4l5 5V4l-5 5H7z" />
            ) : (
              <path d="M4 9v6h4l5 5V4l-5 5H4z" />
            )}
          </svg>
        </button>
    </div>
  )
}

export default ExplainerScene;
