import React from "react";
import ReactDOM from "react-dom";

function PhotoPicker({ onChange }) {
  const component = (
    <input type="file" hidden id="photo-picker" onChange={onChange} />
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById("photo-picker-element") // Ensure this exists in HTML
  );
}

export default PhotoPicker;
