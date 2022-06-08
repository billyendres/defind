import React, { useState } from "react";
import img1 from "../images/code.png";
import img2 from "../images/screenshot.png";
import img3 from "../images/screenshotTwo.png";

const ProfilePic = () => {
  const [selectedNft, setSelectedNft] = useState([]);

  const nfts = [img1, img2, img3];
  return (
    <div style={{ width: "100%" }}>
      <h2>Profile Image (Your NFTs)</h2>
      <div>
        {nfts.map((nft, key) => {
          return (
            <div
              key={key}
              style={{
                border: selectedNft === nft && "3px solid red",
              }}
            >
              <img
                onClick={() => setSelectedNft(nft)}
                style={{ width: "10rem", padding: "1rem" }}
                src={nft}
                alt={nft}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePic;
