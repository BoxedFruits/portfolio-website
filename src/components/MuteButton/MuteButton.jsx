import { useContext } from "react";
import { EnableSoundContext } from "../../App";

const MuteButton = () => {
  const { isMuted, setIsMuted } = useContext(EnableSoundContext);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <button className="mute-button" style={{ backgroundColor: 'transparent', border: '1px solid white', borderRadius: '50%', width: '2rem', height: '2rem', marginLeft: '0.5rem', cursor: 'pointer' }} onClick={toggleMute}>
      <svg style={{ fill: 'white', width: '1.5rem', height: '1.5rem', margin: 'auto' }} viewBox="0 0 24 24">
        {isMuted ? (
          <>
            <path d="M4 9v6h4l5 5V4l-5 5H4z" />
            <rect x="10.5" y="6" width="5" height="24" fill="red" transform="rotate(45, 16.5, 12)" />
          </>
        ) : (
          <path d="M4 9v6h4l5 5V4l-5 5H4z" />
        )}
      </svg>
    </button>
  )
}

export default MuteButton;