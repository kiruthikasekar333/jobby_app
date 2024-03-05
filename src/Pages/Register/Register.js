import React from "react";
import { useFormik } from "formik"; // Import useFormik from Formik
import * as Yup from "yup"; // Import Yup for validation
import "./Register.css";
import registerImage from "../../Assets/register.jpg";
import axios from "../../Api/Axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    dob: Yup.date().required("Date of Birth is required"),
    about: Yup.string(),
    isEmployer: Yup.boolean().required('User Type is required'),
    userImage: Yup.mixed().required("User Image is required"),
  });

  // Create a formik instance
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      about: "",
      isEmployer: "",
      userImage: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Concatenate first name and last name to create userName
      const userName = `${values.firstName} ${values.lastName}`;

      // Convert userType to a number (1 or 0)
      const isEmployer = parseInt(values.isEmployer, 10);
      console.log(isEmployer, "value of isEmployer");
      console.log(formik.values.isEmployer);

      // Now you can use the userName in your data to send to the server
      const dataToSend = {
        ...values,
        userName, 
        isEmployer, 
      };
      console.log(values);
      // Send a POST request to the server using Axios
      axios
        .post("/api/user/registerUser", dataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          alert(res.data.message);
          navigate("/login");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  });

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(${registerImage})`,
      }}
    >
      <h1 style={{ color: "#ffffff" }}>Register</h1>
      <form
        className="register-form"
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error-message">{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error-message">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error-message">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
          />
          {formik.touched.dob && formik.errors.dob ? (
            <div className="error-message">{formik.errors.dob}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
          type="text"
            id="about"
            name="about"
            rows="4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.about}
          />
          {formik.touched.about && formik.errors.about ? (
            <div className="error-message">{formik.errors.about}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Choose User Type:</label>
          <div className="radio-group">
            <input
              type="radio"
              id="employer"
              name="isEmployer"
              value= {1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.isEmployer === "1"}
            />
            <label htmlFor="employer" style={{ marginRight: "6px" }}>
              Employer
            </label>
            <input
              type="radio"
              id="jobSeeker"
              name="isEmployer"
              value={0}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.isEmployer === "0"}
            />
            <label htmlFor="jobSeeker">Job Seeker</label>
          </div>
          {formik.touched.isEmployer && formik.errors.isEmployer ? (
            <div className="error-message">{formik.errors.isEmployer}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="userImage">User Image</label>
          <input
            type="file"
            id="userImage"
            name="userImage"
            onChange={(event) =>
              formik.setFieldValue("userImage", event.currentTarget.files[0])
            }
          />
          {formik.touched.userImage && formik.errors.userImage ? (
            <div className="error-message">{formik.errors.userImage}</div>
          ) : null}
        </div>

        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
