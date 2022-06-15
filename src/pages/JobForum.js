import React, { useState } from "react";
import JobSeekerPosts from "../components/Posting/JobSeekerPosts";
import JobPosterPosts from "../components/Posting/JobPosterPosts";

const JobForum = () => {
  const [jobType, setJobType] = useState(true);
  return (
    <div>
      <h2>JobForum</h2>
      <h2>I am a</h2>
      <div>
        <button onClick={() => setJobType(true)}>Job Seeker</button>
        <button onClick={() => setJobType(false)}>Employer</button>
      </div>
      {jobType ? (
        <JobSeekerPosts profile={false} />
      ) : (
        <JobPosterPosts profile={false} />
      )}
    </div>
  );
};

export default JobForum;
