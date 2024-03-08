import { useContext, useEffect, useRef, useState } from "react";
import BackButton from "../../../components/BackButton/BackButton";
import "./Modal.css";
import { EnableSoundContext } from "../../../App";

const Highlight = {
  Link: "Link",
  Back: "Back"
};

const Modal = ({ data, memoryCardName, closeModal, shrinkModel }) => {
  const {
    title,
    date,
    summary,
    additionalDetails,
    memory,
    bulletPoints,
    linearGradient,
    techStack,
    link
  } = data;

  const cancelAudioRef = useRef(new Audio("backSound.mp3"));
  const [currHighlighted, setCurrHighLighted] = useState(link === "" ? Highlight.Back : Highlight.Link);
  const {isMuted, _} = useContext(EnableSoundContext);
  const lastOrbPosition = useRef(currHighlighted);

  const fadeout = () => {
    cancelAudioRef.current.play();
    shrinkModel();
    document.getElementsByClassName('modal-body-container')[0].className += " fadeout-modal";
    document.getElementsByClassName('modal-background')[0].className += " fadeout-modal";
  };

  useEffect(() => {
    cancelAudioRef.current.muted = isMuted;

    if (lastOrbPosition.current !== currHighlighted) {
      const highlightAudio = new Audio("selectionSound2.mp3");
      
      highlightAudio.muted = isMuted;
      highlightAudio.play();
      
      lastOrbPosition.current = currHighlighted;
    }
  }, [currHighlighted]);

  return (
    <>
      <div className="modal-background-wrapper fadein-modal">
        <div className="modal-background" style={{
          display: "block",
          background: linearGradient
        }}
          onAnimationEnd={() => closeModal()}
        >
        </div>
      </div>
      <div className="modal-body-container">
        <center>
          <p className="text-shadow modal-body" style={{ fontSize: "32px", marginBottom: "8px" }}>Memory Card <span style={{ fontSize: "24px" }}> (PS2) / </span> {memoryCardName}</p>
          <h1 className="text-shadow arial-lighter title" style={{ marginTop: "0", fontSize: "48px", marginBottom: "8px" }} >{title}</h1>
          <p className="text-shadow modal-body" style={{ marginBottom: "0", marginTop: "0", fontSize: "24px", letterSpacing: "2px" }}>{date.start}&nbsp; — &nbsp;{date.end}</p>
          <p className="text-shadow modal-body" style={{ marginTop: "0", marginBottom: "40px", fontSize: "24px", letterSpacing: "2px" }}>{memory}</p>
        </center>
        <p className="text-shadow-thinner modal-body" style={{ lineHeight: "1.5" }}>{summary}</p>
        <p className="text-shadow-thinner modal-body" style={{ lineHeight: "1.5" }}>{additionalDetails}</p>
        <i className="text-shadow-thinner modal-body" style={{ fontSize: "16px" }}>Tech Stack: {techStack}</i>
        <ul style={{ fontSize: "24px" }}>
          {
            bulletPoints.map((bullet, index) => {
              return <li key={index} className="memory-card-bulletpoints text-shadow-thinner modal-body" style={{ lineHeight: "1.8" }}>{bullet}</li>;
            })
          }
        </ul>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "80px" }}>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className={`arial-lighter text-shadow-thinner selectable-text ${currHighlighted === Highlight.Link && link !== "" ? 'highlight' : 'not-highlighted'}`}
            style={{ cursor: link === "" ? "not-allowed" : "pointer", pointerEvents: link === "" ? "none" : "auto", textDecoration: "none" }}
            onMouseEnter={() => setCurrHighLighted(Highlight.Link)}
          >Link</a>
          <p
            className={`arial-lighter text-shadow-thinner selectable-text ${currHighlighted === Highlight.Back ? 'highlight' : 'not-highlighted'}`}
            onMouseEnter={() => setCurrHighLighted(Highlight.Back)}
            onClick={fadeout}
          >
            Back
          </p>
        </div>
      </div>
      <BackButton onClick={fadeout}/>
    </>
  );
};

export default Modal;