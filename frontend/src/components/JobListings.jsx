import JobListing from "./JobListing";

const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {(jobs.maps = (job) => <JobListing job={job} key={job.id} />)}
    </div>
  );
};

export default JobListings;
