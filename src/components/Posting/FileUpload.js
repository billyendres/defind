import React, { useState, useRef } from "react";

const FileUpload = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  const clickHandler = () => {
    inputFile.current.click();
  };

  const changeHandler = (e) => {
    const img = e.target.files[0];
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
      <div style={{ width: "100%", marginTop: "5rem" }}>
        <label>Post and image or tweet</label>
      </div>
      <div onClick={clickHandler} style={{ width: "100%" }}>
        <input
          type="file"
          name="file"
          ref={inputFile}
          onChange={changeHandler}
          style={{ display: "none" }}
        />
        <h1 style={{ cursor: "pointer" }}>Click to upload file</h1>
      </div>
      {selectedFile && <img src={selectedFile} alt={selectedFile} />}
    </>
  );
};

export default FileUpload;
