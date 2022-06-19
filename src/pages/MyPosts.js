import React from "react";
import Profile from "./Profile";
import JobSeekerPosts from "../components/Posting/JobSeekerPosts";

const MyPosts = () => {
  return (
    <div>
      {/* <Profile /> */}
      <JobSeekerPosts profile={true} />
    </div>
  );
};

export default MyPosts;
