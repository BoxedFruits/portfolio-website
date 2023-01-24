import "./BackButton.css"

const BackButton = ({onClick}) => {
  return (
    <div className="back-button" onClick={() => { }}>
      <span className="text-shadow arial-lighter">
        <img src="ps3_button_o_by_thedevingreat.png" alt="Back Button" />
        Back
      </span>
    </div>
  )
}

export default BackButton;