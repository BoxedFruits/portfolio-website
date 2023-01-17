import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import "./Modal.css";

const Highlight = {
  Link: "Link",
  Back: "Back"
}

const Modal = ({ data, memoryCardName, closeModal, Model, shrinkModel }) => {
  const {
    title,
    date,
    summary,
    memory,
    bulletPoints,
    linearGradient,
    techStack,
    link
  } = data;

  const htmlRef = useRef();
  const cancelAudioRef = useRef(new Audio("selectionSound3.mp3"))
  const [currHighlighted, setCurrHighLighted] = useState(link === "" ? Highlight.Back : Highlight.Link);

  const fadeout = () => {
    cancelAudioRef.current.play()
    shrinkModel()
    document.getElementsByClassName('memory-card-body')[0].className += " fadeout-modal"
    document.getElementsByClassName('modal-background')[0].className += " fadeout-modal"
  }

  return (
    <>
      {/* TODO: Refactor this. Probably no need to have two different Html elements. Can also change it to divs with absolute position to allow for scrolling */}
      <Html zIndexRange={[1, 1]} wrapperClass="modal-background-wrapper fadein-modal" fullscreen ref={htmlRef}>
        <div className="modal-background" style={{
          display: "block",
          background: linearGradient
        }}
          onAnimationEnd={() => closeModal()}
        >
        </div>
      </Html>
      <ambientLight />
      {Model}
      <Html transform className="memory-card-body" position={[5.5, 2.5, -10]}>
        <div style={{ maxWidth: "28em" }}>
          <center>
            {/* TODO: move some of the inline styles to the stylesheet */}
            <p className="memory-card-title text-shadow modal-body" style={{ fontSize: "32px", marginBottom: "8px" }}>Memory Card <span style={{ fontSize: "24px" }}> (PS2) / </span> {memoryCardName}</p>
            <h1 className="text-shadow arial-lighter title" style={{ marginTop: "0", fontSize: "48px", marginBottom: "8px" }} >{title}</h1>
            <p className="text-shadow modal-body" style={{ marginBottom: "0", marginTop: "0", fontSize: "24px", letterSpacing: "2px" }}>{date.start}&nbsp; — &nbsp;{date.end}</p>
            <p className="text-shadow modal-body" style={{ marginTop: "0", marginBottom: "40px", fontSize: "24px", letterSpacing: "2px" }}>{memory}</p>
          </center>
          <p className="text-shadow-thinner modal-body" style={{ lineHeight: "1.5" }}>{summary}</p>
          <i className="text-shadow-thinner modal-body" style={{ fontSize: "16px" }}>Tech Stack: {techStack}</i>
          <ul>
            {
              bulletPoints.map((bullet, index) => {
                return <li key={index} className="memory-card-bulletpoints text-shadow-thinner modal-body" style={{ lineHeight: "1.8" }}>{bullet}</li>
              })
            }
          </ul>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p
              href={link}
              target="_blank"
              rel="noopener"
              className={`arial-lighter text-shadow-thinner selectable-text ${currHighlighted === Highlight.Link && link !== "" ? 'highlight' : 'not-highlighted'}`}
              style={{ cursor: link === "" ? "not-allowed" : "pointer" }}
              onMouseEnter={() => setCurrHighLighted(Highlight.Link)}
            >Link</p>
            <p
              className={`arial-lighter text-shadow-thinner selectable-text ${currHighlighted === Highlight.Back ? 'highlight' : 'not-highlighted'}`}
              onMouseEnter={() => setCurrHighLighted(Highlight.Back)}
              onClick={() =>  fadeout()}
            >
              Back
            </p>
          </div>
        </div>
      </Html>
    </>
  );
}

export default Modal;