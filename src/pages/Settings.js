import React, { useState, useRef, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import styled from "styled-components";
import Username from "../components/Profile/Username";
import Bio from "../components/Profile/Bio";
import BannerImage from "../components/Profile/BannerImage";
import defaultProfileImage from "../components/images/defaultProfileImage.png";

const Settings = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultProfileImage);
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState([]);

  const { userError, Moralis, account } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const user = Moralis.User.current();

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  useEffect(() => {
    const fetchNfts = async () => {
      const options = {
        chain: "Ropsten Test Network",
        address: account,
      };

      const ropstenNfts = await Web3Api.account.getNFTs(options);
      const images = ropstenNfts.result.map((e) =>
        resolveLink(JSON.parse(e.metadata)?.image)
      );
      setNfts(images);
    };

    fetchNfts();
  }, [account]);

  const clickHandler = () => {
    inputFile.current.click();
  };

  const changeHandler = (e) => {
    const img = e.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if (bio) {
      myDetails.set("bio", bio);
    }

    if (username) {
      myDetails.set("username", username);
    }

    if (selectedNft) {
      myDetails.set("nft", selectedNft);
    }

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("banner", file.ipfs());
    }

    await myDetails.save();
    window.location.reload();
  };

  return (
    <Wrapper>
      <h1 style={{ width: "100%" }}>Settings</h1>
      <>
        {userError && <p>{JSON.stringify(userError.message)}</p>}

        <Username
          change={(e) => setUsername(e.currentTarget.value)}
          inputValue={username}
        />
        <Bio change={(e) => setBio(e.currentTarget.value)} inputValue={bio} />
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
        <BannerImage
          change={changeHandler}
          click={clickHandler}
          inputFile={inputFile}
          file={user.attributes.banner ? user.attributes.banner : selectedFile}
        />
        <Button onClick={saveEdits}>Save</Button>
      </>
    </Wrapper>
  );
};

export default Settings;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
`;
