import React, { useState, useEffect } from "react";
import { useAuth } from "../../Helpers/UserContext";
import axios from "../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Helpers/ThemeContext";

import "./JobListByEmployerId.css";
import EditJobForm from "./EditJobForm";

const JobsList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const employerId = user.userId;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `/api/jobs/getJobsByEmployerId/${employerId}`
        );
        const data = response.data;
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isEditing, employerId, setJobs]);

  const handleEditJob = (jobId) => {
    const selectedJob = jobs.find((job) => job.job_id === jobId);
    console.log(selectedJob, "job details of job to edit");
    setSelectedJob(selectedJob);
    setIsEditing(true);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      
      const updatedJobs = jobs.filter((job) => job.job_id !== jobId);
      setJobs(updatedJobs);
  
      
      const response = await axios.delete(`/api/jobs/deleteJobs/${jobId}/${employerId}`);
      console.log(response.data);
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      
      const response = await axios.get(`/api/jobs/getJobsByEmployerId/${employerId}`);
      setJobs(response.data);
    }
  };
  

  const handleAddJob = () => {
    navigate("/createJobs");
  };

  return (
    <div className="jlsub-container">
      {isEditing ? (
        <EditJobForm
          selectedJob={selectedJob}
          employerId={employerId}
          setIsEditing={setIsEditing}
          setJobs={setJobs}
        />
      ) : (
        <>
          <h2>
            Job List of{" "}
            {jobs.length > 0 ? jobs[0].company_name : "No Jobs Available"}
          </h2>

          <button onClick={handleAddJob} className="add-job-button">
            Add Job
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : jobs.length > 0 ? (
            <div className="job-cards-container">
              {jobs.map((job) => (
                <div key={job.job_id} className="job-card">
                  <div className="company-info">
                    {job.company_logo ? (
                      <img
                        key={job.job_id}
                        src={`http://localhost:4000/uploads/${job.company_logo}`}
                        alt="Company Logo"
                        className="card-logo"
                      />
                    ) : (
                      <p className="no-logo-text">No company logo available</p>
                    )}
                    <h3 className="job-heading">{job.company_name}</h3>
                  </div>
                  <p>
                    {" "}
                    <strong> Job Role: </strong> {job.job_role}
                  </p>
                  <p>
                    {" "}
                    <strong>Job Type: </strong>
                    {job.job_type}
                  </p>
                  <p>
                    {" "}
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    {" "}
                    <strong> Skills: </strong> {job.skills}
                  </p>
                  <p>
                    {" "}
                    <strong>Salary: </strong> {job.salary}
                  </p>
                  <p>
                    {" "}
                    <strong>Responsibilities: </strong> {job.responsibilities}
                  </p>
                  <p>
                    <strong>Experience: </strong> {job.experience}
                  </p>
                  <p>
                    <strong>About Job:</strong> {job.about_job}
                  </p>
                  <p>
                    <strong>About Company: </strong>
                    {job.about_company}
                  </p>
                  <div className="edit-delete-buttons">
                    <button onClick={() => handleEditJob(job.job_id)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.job_id)}
                      className="delete-job-button"
                    >
                      Delete
                    </button>
                  </div>
                  <hr className="separator-line" />
                </div>
              ))}
            </div>
          ) : (
            <p>No jobs found for the employer.</p>
          )}
        </>
      )}
    </div>
  );
};

export default JobsList;
