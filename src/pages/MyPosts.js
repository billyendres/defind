import React from "react";
import Profile from "./Profile";
import JobSeekerPosts from "../components/Posting/JobSeekerPosts";

const MyPosts = () => {
  return (
    <div>
      <Profile />
      <JobSeekerPosts profile={true} />
    </div>
  );
};

export default MyPosts;

// import React, { useState, useRef, useEffect } from "react";
// import JobSeekerPosts from "../components/Posting/JobSeekerPosts";
// import { useMoralis } from "react-moralis";

// const MyPosts = () => {
//   const { Moralis } = useMoralis();

//   const inputFile = useRef(null);
//   const [fileInput, setFileInput] = useState();
//   const [selectedFile, setSelectedFile] = useState();
//   const [postArr, setPostArr] = useState();

//   const uploadFile = async () => {
//     const Applications = Moralis.Object.extend("Applications");
//     const newJobApplication = new Applications();

//     if (!fileInput) return alert("No file detected");

//     if (fileInput) {
//       const data = fileInput;
//       const file = new Moralis.File(data.name, data);

//       await file.saveIPFS();
//       newJobApplication.set("name", file.ipfs());

//       console.log(file.ipfs(), file.hash());
//     }

//     await newJobApplication.save();
//     window.location.reload();
//   };

//   const onImageClick = () => {
//     inputFile.current.click();
//   };

//   const imageMimeType = /application\/(pdf)/i;

//   const changeHandler = (e) => {
//     const img = e.target.files[0];
//     if (!img.type.match(imageMimeType)) {
//       alert("Upload PDF");
//       return;
//     }
//     setFileInput(img);
//     setSelectedFile(URL.createObjectURL(img));
//   };

//   useEffect(() => {
//     const getApplications = async () => {
//       try {
//         const Applications = Moralis.Object.extend("Applications");
//         const query = new Moralis.Query(Applications);
//         const results = await query.find();
//         setPostArr(results);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getApplications();
//   }, [Moralis.Object, Moralis.Query]);

//   return (
//     <div style={{ marginTop: "10rem" }}>
//       <h2>My Posts</h2>
//       <JobSeekerPosts profile={true} />
//       {selectedFile && <img src={selectedFile} alt={selectedFile} />}

//       <div onClick={onImageClick}>
//         <input
//           type="file"
//           name="file"
//           accept="application/pdf"
//           ref={inputFile}
//           onChange={changeHandler}
//           style={{ display: "none" }}
//         />
//         <h4 style={{ cursor: "pointer" }}>POST IMAGE</h4>
//       </div>
//       <button onClick={uploadFile}>UPLOAD FILE</button>
//       {postArr
//         ?.map((e, key) => {
//           return (
//             <div key={key}>
//               {/* <div>{e.attributes.name}</div> */}
//               <a
//                 href={e.attributes.name}
//                 alt="Link"
//                 target="_blank"
//                 rel="noreferrer noopener"
//               >
//                 Resume
//               </a>
//             </div>
//           );
//         })
//         .reverse()}
//     </div>
//   );
// };

// export default MyPosts;
