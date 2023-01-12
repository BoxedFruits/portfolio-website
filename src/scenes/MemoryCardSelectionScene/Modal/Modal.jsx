import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";

const TARGET_ALPHA = .88;
const LERP_FACTOR = 0.03;

const Highlight = {
  Link: "Link",
  Back: "Back"
}

const parseGradientValues = (rgba) => {
  const beginningOfString = rgba.match(/(^.*deg, )/g);
  const percentages = rgba.match(/(\d*%)/g)
  const rgbaValues = rgba.match(/(\d?\d+),/g)
  const currentAlphaVal = rgba.match(/(\d*(\.\d+)?)\)/m)[1]

  return ({ beginningOfString, percentages, rgbaValues, currentAlphaVal })
}

const Modal = ({ data, memoryCardName, closeModal, Model }) => {
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
  const [currHighlighted, setCurrHighLighted] = useState(link === "" ? Highlight.Back : Highlight.Link);
  const [triggerExitAnimation, setTriggerExitAnimation] = useState(false);

  useFrame(() => {
    if (htmlRef.current !== undefined) { //Load animation
      changeBackgroundAlpha(TARGET_ALPHA)
    }

    if (triggerExitAnimation) {

      //TODO: text not fading out. lerp is not going down in value like i expect it to
      document.getElementsByClassName('memory-card-body')[0].style.opacity = `${MathUtils.lerp(100, 0, 0.01)} %`
      if (changeBackgroundAlpha(-1) - 0.05 <= 0) {
        closeModal()
      }
    }
  });

  const changeBackgroundAlpha = (alpha) => {
    const {
      beginningOfString,
      percentages,
      rgbaValues,
      currentAlphaVal
    } = parseGradientValues(htmlRef.current.getElementsByClassName('modal-background')[0].style.background)

    let newBackground = beginningOfString
    let percentageIndex = 0
    for (let index = 0; index < rgbaValues.length; index += 3) {
      newBackground += `rgba(${rgbaValues[index]} ${rgbaValues[index + 1]} ${rgbaValues[index + 2]} ${MathUtils.lerp(currentAlphaVal, alpha, LERP_FACTOR)}) ${percentages[percentageIndex++]}, `
    }
    newBackground = newBackground.slice(0, -2) + ")"

    htmlRef.current.getElementsByClassName('modal-background')[0].style.background = newBackground;
    return currentAlphaVal;
  }

  return (
    <>
      <Html zIndexRange={[1, 1]} wrapperClass="modal-background-wrapper" fullscreen ref={htmlRef}>
        <div className="modal-background" style={{
          display: "block",
          background: linearGradient
        }}>
        </div>
      </Html>
      <ambientLight />
      {Model}
      <Html transform className="memory-card-body" style={{opacity: "100%"}} position={[5.5, 2.5, -10]}>
        <div style={{ maxWidth: "28em" }}>
          <center>
            {/* TODO: move some of the inline styles to the stylesheet */}
            <p className="memory-card-title text-shadow" style={{ fontSize: "32px", marginBottom: "8px", color: "#dfdbdb" }}>Memory Card <span style={{ fontSize: "24px" }}> (PS2) / </span> {memoryCardName}</p>
            <h1 className="text-shadow" style={{ color: "#dddd4e", marginTop: "0", fontFamily: "arial", fontWeight: "lighter", fontSize: "48px", marginBottom: "8px" }} >{title}</h1>
            <p className="text-shadow" style={{ marginBottom: "0", marginTop: "0", fontSize: "24px", color: "#dfdbdb", letterSpacing: "2px" }}>{date.start}&nbsp; — &nbsp;{date.end}</p>
            <p className="text-shadow" style={{ marginTop: "0", marginBottom: "40px", fontSize: "24px", color: "#dfdbdb", letterSpacing: "2px" }}>{memory}</p>
          </center>
          <p style={{ lineHeight: "1.5", color: "#dfdbdb", textShadow: "-1px 1px 0px #000, 1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000" }}>{summary}</p>
          <i style={{ fontSize: "16px", color: "#dfdbdb", textShadow: "-1px 1px 0px #000, 1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000" }}>Tech Stack:  {techStack}</i>
          <ul>
            {
              bulletPoints.map((bullet, index) => {
                return <li key={index} style={{ lineHeight: "1.8", color: "#dfdbdb", textShadow: "-1px 1px 0px #000, 1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000" }} className="memory-card-bulletPoints">{bullet}</li>
              })
            }
          </ul>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p
              href={link}
              target="_blank"
              rel="noopener"
              className={`${currHighlighted === Highlight.Link && link !== "" ? 'highlight' : ''}`}
              style={{ color: "#5e5a5a", fontFamily: "arial", fontWeight: "lighter", fontSize: "3.25em", marginBottom: "10px", marginTop: "0px", textShadow: "-1px 1px 0px #000, 1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000", textDecoration: "none", cursor: link === "" ? "not-allowed" : "grab" }}
              onMouseEnter={() => setCurrHighLighted(Highlight.Link)}
            >Link</p>
            <p
              className={`${currHighlighted === Highlight.Back ? 'highlight' : ''}`}
              style={{ color: "#5e5a5a", fontFamily: "arial", fontWeight: "lighter", fontSize: "3.25em", marginBottom: "10px", marginTop: "0px", textShadow: "-1px 1px 0px #000, 1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000", cursor: "pointer" }}
              onMouseEnter={() => setCurrHighLighted(Highlight.Back)}
              onClick={() => { setTriggerExitAnimation(true) }}
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