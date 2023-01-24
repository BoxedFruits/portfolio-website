import "./BackButton.css"

const BackButton = ({onClick}) => {
  const cancelAudio = new Audio("selectionSound3.mp3")

  const handleOnClick = () => {
    cancelAudio.play()
    onClick()
  }
  
  return (
    <div className="back-button" onClick={handleOnClick}>
      <span className="text-shadow arial-lighter">
        <img src="ps3_button_o_by_thedevingreat.png" alt="Back Button" />
        Back
      </span>
    </div>
  )
}

export default BackButton;