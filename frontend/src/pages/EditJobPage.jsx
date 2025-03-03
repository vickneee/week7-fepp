import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    jobTitle: "",
    jobType: "Full-Time",
    jobDescription: "",
    companyName: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/api/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        setError("Error fetching job details.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/jobs/${id}`);
        } else {
          setError("Error updating job.");
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        setError("Error updating job.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-job-page">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title:</label>
        <input
          type="text"
          name="jobTitle"
          value={job.jobTitle}
          onChange={handleChange}
          required
        />

        <label>Job Type:</label>
        <select
          name="jobType"
          value={job.jobType}
          onChange={handleChange}
          required
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          name="jobDescription"
          value={job.jobDescription}
          onChange={handleChange}
          required
        />

        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={job.companyName}
          onChange={handleChange}
          required
        />

        <label>Contact Email:</label>
        <input
          type="email"
          name="contactEmail"
          value={job.contactEmail}
          onChange={handleChange}
          required
        />

        <label>Contact Phone:</label>
        <input
          type="text"
          name="contactPhone"
          value={job.contactPhone}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default EditJobPage;
