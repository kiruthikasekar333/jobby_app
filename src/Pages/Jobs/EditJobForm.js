import React, { useState } from "react";
import axios from "../../Api/Axios";
import "./EditJobForm.css";

const EditJobForm = ({ selectedJob, employerId, setIsEditing, setJobs }) => {
  // Initialize state with job data, including a file property for the company logo
  const [formData, setFormData] = useState({
    company_logo: selectedJob?.company_logo || null,
    company_name: selectedJob?.company_name || "",
    job_role: selectedJob?.job_role || "",
    job_type:selectedJob?.job_type || "",
    location:selectedJob?.location || "",
    skills:selectedJob?.skills || "",
    salary: selectedJob?.salary || "",
    responsibilities: selectedJob?.responsibilities || "",
    experience:selectedJob?.experience || "",
    about_job:selectedJob?.about_job || "",
    about_company: selectedJob?.about_company || "",
  });

  // Handle regular input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      company_logo: file,
    }));
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Append other fields to the FormData object
      Object.keys(formData).forEach((key) => {
        if (key !== "company_logo") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append company_logo to FormData as a file
      if (formData.company_logo) {
        formDataToSend.append("company_logo", formData.company_logo);
      }

      console.log("FormData to Send:", formDataToSend);
      const response = await axios.put(
        `/api/jobs/editJobs/${selectedJob?.job_id}/${employerId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Edited JOb Details".formDataToSend);
      // Log response and show alert

      alert("Job updated successfully!");

      // Update state with the new job data
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.job_id === selectedJob.job_id ? { ...job, ...formData } : job
        )
      );

      // Set editing to false to exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    // Set editing to false to exit edit mode
    setIsEditing(false);
  };
  return (
    <div className="edit-job-container">
      <h1>Edit Job</h1>
      <div className="edit-job-form">
        <div className="form-group">
          <label className="edit-label" htmlFor="companyLogo">
            Company Logo:{" "}
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="companyName">
            Company Name:{" "}
          </label>

          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="jobRole">
            Job Role:
          </label>
          <input
            type="text"
            name="job_role"
            value={formData.job_role}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="jobType">
            Job Type:{" "}
          </label>
          <input
            type="text"
            name="job_type"
            value={formData.job_type}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="location">
            Location:{" "}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="skills">
            Skills:{" "}
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="salary">
            Salary:{" "}
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="responsibilities">
            Responsibilities:{" "}
          </label>
          <textarea
            type="text"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="experience">
            Experience:{" "}
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="aboutJob">
            About Job:{" "}
          </label>
          <textarea
            type="text"
            name="about_job"
            value={formData.about_job}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>

        <div className="form-group">
          <label className="edit-label" htmlFor="aboutCompany">
            About Company:
          </label>
          <textarea
            type="text"
            name="about_company"
            value={formData.about_company}
            onChange={handleInputChange}
            className="edit-input"
          />
        </div>
        </div>
        <div className="edit-button-container">
          <button className="edit-button" onClick={handleSave}>
            Save
          </button>
          <button className="edit-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      
    </div>
  );
};

export default EditJobForm;
