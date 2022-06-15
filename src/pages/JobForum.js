import React, { useState } from "react";

const JobForum = () => {
  const [jobType, setJobType] = useState(true);
  return (
    <div>
      <h2>JobForum</h2>
      <h2>I am a</h2>
      <button onClick={() => setJobType(true)}>Job Seeker</button>
      <button onClick={() => setJobType(false)}>Employer</button>
      {jobType ? <h3>Job Seeker Listings</h3> : <h3>Employer job postings</h3>}
    </div>
  );
};

export default JobForum;
