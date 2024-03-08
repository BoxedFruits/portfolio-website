import { useContext } from "react";
import "./BackButton.css";
import { EnableSoundContext } from "../../App";

const BackButton = ({onClick}) => {
  const cancelAudio = new Audio("backSound.mp3");
  const { isMuted, _ } = useContext(EnableSoundContext);

  const handleOnClick = () => {
    cancelAudio.muted = isMuted;
    cancelAudio.play();
    onClick();
  };
  
  return (
    <div className="back-button" onClick={handleOnClick}>
      <span className="text-shadow arial-lighter">
        <img src="ps3_button_o_by_thedevingreat.png" alt="Back Button" />
        Back
      </span>
    </div>
  );
};

export default BackButton;