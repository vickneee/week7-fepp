import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const [job, setJob] = useState(null); // Initialize job state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { id } = useParams();
  
  // Declare state variables for form fields
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  
  const navigate = useNavigate();
  
  const updateJob = async (job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      if (!res.ok) throw new Error("Failed to update job");
      return res.ok;
    } catch (error) {
      console.error("Error updating job:", error);
      return false;
    }
  };
  
  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setJob(data); // Set the job data
        
        // Initialize form fields with fetched job data
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };
    
    fetchJob();
  }, [id]);
  
  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    
    const updatedJob = {
      id,
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };
    
    const success = await updateJob(updatedJob);
    if (success) {
      // toast.success("Job Updated Successfully");
      navigate(`/jobs/${id}`);
    } else {
      // toast.error("Failed to update the job");
    }
  };
  
  return (
    <div className="create">
      <h2>Update Job</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitForm}>
          <label>Job title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Job type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
          
          <label>Job Description:</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label>Company Name:</label>
          <input
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <label>Contact Email:</label>
          <input
            type="text"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <label>Contact Phone:</label>
          <input
            type="text"
            required
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
          <button>Update Job</button>
        </form>
      )}
    </div>
  );
};

export default EditJobPage;

// Old code for reference This is not working

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
//
// const EditJobPage = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState({
//     jobTitle: "",
//     jobType: "Full-Time",
//     jobDescription: "",
//     companyName: "",
//     contactEmail: "",
//     contactPhone: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     fetch(`http://localhost:4000/api/jobs/${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setJob(data);
//         setLoading(false);
//       })
//       // eslint-disable-next-line no-unused-vars
//       .catch((error) => {
//         setError("Error fetching job details.");
//         setLoading(false);
//       });
//   }, [id]);
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setJob((prevJob) => ({
//       ...prevJob,
//       [name]: value,
//     }));
//   };
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//
//     fetch(`/api/jobs/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(job),
//     })
//       .then((response) => {
//         if (response.ok) {
//           navigate(`/jobs/${id}`);
//         } else {
//           setError("Error updating job.");
//         }
//       })
//       // eslint-disable-next-line no-unused-vars
//       .catch((error) => {
//         setError("Error updating job.");
//       });
//   };
//
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//
//   if (error) {
//     return <div>{error}</div>;
//   }
//
//   return (
//     <div className="create">
//       <h2>Edit Job</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Job Title:</label>
//         <input
//           type="text"
//           name="jobTitle"
//           value={job.jobTitle}
//           onChange={handleChange}
//           required
//         />
//
//         <label>Job Type:</label>
//         <select
//           name="jobType"
//           value={job.jobType}
//           onChange={handleChange}
//           required
//         >
//           <option value="Full-Time">Full-Time</option>
//           <option value="Part-Time">Part-Time</option>
//           <option value="Remote">Remote</option>
//           <option value="Internship">Internship</option>
//         </select>
//
//         <label>Job Description:</label>
//         <textarea
//           name="jobDescription"
//           value={job.jobDescription}
//           onChange={handleChange}
//           required
//         />
//
//         <label>Company Name:</label>
//         <input
//           type="text"
//           name="companyName"
//           value={job.companyName}
//           onChange={handleChange}
//           required
//         />
//
//         <label>Contact Email:</label>
//         <input
//           type="email"
//           name="contactEmail"
//           value={job.contactEmail}
//           onChange={handleChange}
//           required
//         />
//
//         <label>Contact Phone:</label>
//         <input
//           type="text"
//           name="contactPhone"
//           value={job.contactPhone}
//           onChange={handleChange}
//           required
//         />
//
//         <button type="submit">Update Job</button>
//       </form>
//     </div>
//   );
// };
//
// export default EditJobPage;
