import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const Posts = ({ profile }) => {
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();
  const [postArr, setPostArr] = useState();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const Posts = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Posts);
        if (profile) {
          query.equalTo("posterAccount", account);
        }
        console.log(account);
        const results = await query.find();
        setPostArr(results);
        // console.log(results);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, [profile, account]);

  // console.log(user);

  return (
    <div>
      {postArr
        ?.map((e, key) => {
          return (
            <div key={key}>
              <h1>{e.attributes.postTxt}</h1>
              <div>
                {e.attributes.postImg && (
                  <img src={e.attributes.postImg} alt={e} />
                )}
              </div>
              <div>
                POSTER: {e.attributes.posterUsername.slice(0, 6)}
                <img
                  style={{ width: "5rem" }}
                  src={e.attributes.posterBanner}
                  alt="Profile pic"
                />
                <div>
                  {`${e.attributes.posterAccount.slice(
                    0,
                    4
                  )}...${e.attributes.posterAccount.slice(38)} · 
                        ${e.attributes.createdAt.toLocaleString("en-us", {
                          month: "short",
                        })}  
                        ${e.attributes.createdAt.toLocaleString("en-us", {
                          day: "numeric",
                        })}
                        `}
                </div>
              </div>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default Posts;
