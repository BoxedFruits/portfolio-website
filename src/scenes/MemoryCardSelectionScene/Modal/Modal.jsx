import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";

const TARGET_ALPHA = .88;
const LERP_FACTOR = 0.03;

const parseGradientValues = (rgba) => {
  const beginningOfString = rgba.match(/(^.*deg, )/g);
  const percentages = rgba.match(/(\d*%)/g)
  const rgbaValues = rgba.match(/(\d?\d+),/g)
  const currentAlphaVal = rgba.match(/(\d*(\.\d+)?)\)/m)[1]

  return ({ beginningOfString, percentages, rgbaValues, currentAlphaVal })
}

const Modal = ({ data, memoryCardName, Model }) => {
  const {
    title,
    date,
    summary,
    memory,
    bulletPoints,
    linearGradient,
    techStack
  } = data;

  const htmlRef = useRef();

  useFrame(() => {
    if (htmlRef.current !== undefined) {
      const {
        beginningOfString,
        percentages,
        rgbaValues,
        currentAlphaVal
      } = parseGradientValues(htmlRef.current.getElementsByClassName('modal-background')[0].style.background)

      let newBackground = beginningOfString
      let percentageIndex = 0
      for (let index = 0; index < rgbaValues.length; index += 3) {
        newBackground += `rgba(${rgbaValues[index]} ${rgbaValues[index + 1]} ${rgbaValues[index + 2]} ${MathUtils.lerp(currentAlphaVal, TARGET_ALPHA, LERP_FACTOR)}) ${percentages[percentageIndex++]}, `
      }
      newBackground = newBackground.slice(0, -2) + ")"

      htmlRef.current.getElementsByClassName('modal-background')[0].style.background = newBackground;
    }
  });

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
      <Html transform className="memory-card-body" position={[5.5, 2.5, -10]}>
        <div style={{ maxWidth: "28em" }}>
          <center>
            {/* TODO: move some of the inline styles to the stylesheet */}
            <p className="memory-card-title text-shadow" style={{ fontSize: "32px", marginBottom: "8px", color: "#dfdbdb" }}>Memory Card <span style={{ fontSize: "24px" }}> (PS2) / </span> {memoryCardName}</p>
            <h1 className="text-shadow" style={{ color: "#dddd4e", marginTop: "0", fontFamily: "arial", fontWeight: "lighter", fontSize: "48px", marginBottom: "8px" }} >{title}</h1>
            <p className="text-shadow" style={{ marginBottom: "0", marginTop: "0", fontSize: "24px", color: "#dfdbdb", letterSpacing: "2px" }}>{date.start}&nbsp; — &nbsp;{date.end}</p>
            <p className="text-shadow" style={{ marginTop: "0", marginBottom: "40px", fontSize: "24px", color: "#dfdbdb", letterSpacing: "2px" }}>{memory}</p>
          </center>
          <p style={{ lineHeight: "1.5", color: "#dfdbdb", textShadow: "-1px 1px 0px #000, 1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000" }}>{summary}</p>
          <i style={{ fontSize: "16px", color: "#dfdbdb", textShadow: "-1px 1px 0px #000, 1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000"}}>Tech Stack:  {techStack}</i>
          <ul>
            {
              bulletPoints.map((bullet, index) => {
                return <li key={index} style={{ lineHeight: "1.8", color: "#dfdbdb", textShadow: "-1px 1px 0px #000, 1px 1px 0px #000, 1px -1px 0px #000, -1px -1px 0px #000" }} className="memory-card-bulletPoints">{bullet}</li>
              })
            }
          </ul>
        </div>
      </Html>
    </>
  );
}

export default Modal;