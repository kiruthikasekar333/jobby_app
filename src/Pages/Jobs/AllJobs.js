// AllJobs.js

import React, { useEffect, useState, useRef} from 'react';
import axios from '../../Api/Axios';
import './AllJobs.css';
import { useAuth } from "../../Helpers/UserContext"

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false); // Add a dummy state
  const { user } = useAuth();
  const selectedJobRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs/getAllJobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
      }
    };

    fetchJobs();
  }, [forceUpdate]); // Include forceUpdate as a dependency to trigger useEffect on state change

  useEffect(() => {
    console.log('Selected Job after state update:', selectedJob);
  }, [selectedJob]);

  const handleSelectedJob = async (job) => {
    try {
      const response = await axios.get(`/api/jobs/getJobsByJobId/${job.job_id}`);
      console.log("SELECTED JOBS RESPONSE", response.data);
      setSelectedJob(response.data);
      console.log("set select job", response.data);
  
      // Wait for the next render cycle before scrolling
      setTimeout(() => {
        const selectedJobElement = document.getElementById('selectedJobDetails');
        if (selectedJobElement) {
          selectedJobElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
  
      setForceUpdate(!forceUpdate); // Toggle the dummy state to force a re-render
    } catch (error) {
      console.error('Error fetching job details:', error.message);
    }
  };
  
  const handleApplyJob = () => {
    if (user && !user.isEmployer) {
      const alertMessage = `Job applied successfully at ${selectedJob.job.company_name} for the role of ${selectedJob.job.job_role}!`;
      alert(alertMessage);
    } else {
      alert("Access denied!!");
    }
  };

  useEffect(() => {
    console.log("set select job in use effect", selectedJob);
  }, [selectedJob]);

  return (
    <div className="all-jobs-container">
      <div className="job-list">
        {jobs.map((job, index) => (
          <div className="job-card" key={index}>
            <div className="company-info">
              <img
                src={`http://localhost:4000/uploads/${job.company_logo}`}
                alt="Company Logo"
                className="card-logo"
              />
              <h2 className="job-heading">{job.company_name}</h2>
            </div>
            <p className="job-text"><strong>Job Role:</strong> {job.job_role}</p>
            <p className="job-text"><strong>Location:</strong> {job.location}</p>
            <p className="job-text"><strong>Salary:</strong> {job.salary}</p>
            <p className="job-text"><strong>Experience:</strong> {job.experience}</p>
            <div className="apply-button-container">
              <button
                className="apply-button-arrow"
                onClick={() => handleSelectedJob(job)}
              >
                ➔
              </button>
            </div>
            <hr className="separator-line" />
          </div>
        ))}
      </div>

      <div className="selected-job-container">
        {selectedJob && selectedJob.job && (
          <div className="selected-job-details" id="selectedJobDetails" ref={selectedJobRef}>
            <button className="close-button" onClick={() => setSelectedJob(null)}>
              &#10006;
            </button>
            <div className="company-info">
              <img
                src={`http://localhost:4000/uploads/${selectedJob.job.company_logo}`}
                alt="Company Logo"
                className="card-logo"
              />
              <h2 className="job-heading">{selectedJob.job.company_name}</h2>
            </div>
            <p className="job-text"><strong>Job Role:</strong> {selectedJob.job.job_role}</p>
            <p className="job-text"><strong>Job Type:</strong> {selectedJob.job.job_type}</p>
            <p className="job-text"><strong>Location:</strong> {selectedJob.job.location}</p>
            <p className="job-text"><strong>Skills:</strong> {selectedJob.job.skills}</p>
            <p className="job-text"><strong>Salary:</strong> {selectedJob.job.salary}</p>
            <p className="job-text"><strong>Responsibilities:</strong> {selectedJob.job.responsibilities}</p>
            <p className="job-text"><strong>Experience:</strong> {selectedJob.job.experience}</p>
            <p className="job-text"><strong>About Job:</strong> {selectedJob.job.about_job}</p>
            <p className="job-text"><strong>About Company:</strong> {selectedJob.job.about_company}</p>
            <div className="apply-button-container">
              <button
                className="apply-button"
                onClick={() => handleApplyJob(selectedJob.job)}
              >
                Apply Job
              </button>
            </div>
            <hr className="separator-line" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
