import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../Api/Axios";
import "./CreateJobs.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    company_logo: Yup.mixed()
    .required("Company Logo is required")
    .test("fileType", "Only image files with extensions jpeg, jpg, png, or gif are allowed", (value) => {
      return value && ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(value.type);
    }),
  company_name: Yup.string().required("Company Name is required"),
  job_role: Yup.string().required("Job Role is required"),
  job_type: Yup.string().required("Job Type is required"),
  location: Yup.string().required("Location is required"),
  skills: Yup.string().required("Skills are required"),
  salary: Yup.string().required("Salary is required"),
  responsibilities: Yup.string().required("Responsibilities are required"),
  experience: Yup.string().required("Experience is required"),
  about_job: Yup.string().required("About Job is required"),
  about_company: Yup.string().required("About Company is required"),
});

const CreateJobs = () => {
  const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          company_logo: null,
          company_name: "",
          job_role: "",
          job_type: "",
          location: "",
          skills: "",
          salary: "",
          responsibilities: "",
          experience: "",
          about_job: "",
          about_company: "",
        },
        

        validationSchema: validationSchema,
 onSubmit: async (values) => {
    try {
        // Send a request to your backend endpoint
        await axios.post("/api/jobs/postJobs", values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        // Handle success, e.g., show a success message or redirect
        console.log("Job posted successfully!");
        alert("Job Posted");
        navigate("/")
      
      } catch (error) {
        // Log the full error for debugging
        console.error("Error posting job:", error);
    alert(error)
        // Handle errors more gracefully
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server responded with an error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      }
},
});

  return (
    <div>
         <div className="create-jobs-container">
         <h1 style={{ textAlign: "center"}}>Create Jobs Form</h1>
      <form
        className="create-jobs-form"
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="company_logo">Company Logo:</label>
          <input
            type="file"
            id="company_logo"
            name="company_logo"
            onChange={(event) =>
              formik.setFieldValue("company_logo", event.currentTarget.files[0])
            }
          />
          {formik.touched.company_logo && formik.errors.company_logo ? (
            <div className="error-message">{formik.errors.company_logo}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="company_name">Company Name:</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.company_name}
          />
          {formik.touched.company_name && formik.errors.company_name ? (
            <div className="error-message">{formik.errors.company_name}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="job_role">Job Role:</label>
          <input
            type="text"
            id="job_role"
            name="job_role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.job_role}
          />
          {formik.touched.job_role && formik.errors.job_role ? (
            <div className="error-message">{formik.errors.job_role}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="job_type">Job Type:</label>
          <input
            type="text"
            id="job_type"
            name="job_type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.job_type}
          />
          {formik.touched.job_type && formik.errors.job_type ? (
            <div className="error-message">{formik.errors.job_type}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="error-message">{formik.errors.location}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            id="skills"
            name="skills"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.skills}
          />
          {formik.touched.skills && formik.errors.skills ? (
            <div className="error-message">{formik.errors.skills}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            id="salary"
            name="salary"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.salary}
          />
          {formik.touched.salary && formik.errors.salary ? (
            <div className="error-message">{formik.errors.salary}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="responsibilities">Responsibilities:</label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.responsibilities}
          />
          {formik.touched.responsibilities && formik.errors.responsibilities ? (
            <div className="error-message">
              {formik.errors.responsibilities}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience:</label>
          <input
            type="text"
            id="experience"
            name="experience"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.experience}
          />
          {formik.touched.experience && formik.errors.experience ? (
            <div className="error-message">{formik.errors.experience}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="about_job">About Job:</label>
          <textarea
            id="about_job"
            name="about_job"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.about_job}
          />
          {formik.touched.about_job && formik.errors.about_job ? (
            <div className="error-message">{formik.errors.about_job}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="about_company">About Company:</label>
          <textarea
            id="about_company"
            name="about_company"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.about_company}
          />
          {formik.touched.about_company && formik.errors.about_company ? (
            <div className="error-message">{formik.errors.about_company}</div>
          ) : null}
        </div>

        <button type="submit">Post Jobs</button>
      </form>
      
    </div>

        
    </div>
       
  );
};

export default CreateJobs;
