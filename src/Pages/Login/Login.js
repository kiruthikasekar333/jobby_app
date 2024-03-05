import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import loginImage from "../../Assets/register.jpg";
import "./Login.css";
import jwt_decode from "jwt-decode";
import axios from "../../Api/Axios";
import setAuthToken from "../../Utils/SetAuthToken";
import { useAuth } from "../../Helpers/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: (values) => {
      axios
        .post("/api/user/loginUser", values)
        .then(async (res) => {
          const token = res?.data?.token;
          if (token) {
            localStorage.setItem("jobs", token);            
            console.log(token);
            setAuthToken(token);   
            const decoded = jwt_decode(token);
            setUser( decoded );
            console.log("UserDetails from Login:", decoded);
            navigate("/");
          } else {
            // Handle error response
            console.error("API request failed with status:", res.status);
            alert("An error occurred. Please try again.");
          }
        })
        .catch((err) => {
          // Handle network errors or unexpected errors
          console.error("API request error:", err);
          alert("An error occurred. Please try again.");
        });
    },
  });
  useEffect(() => {
    let currentTime;
    let decoded;

    if (localStorage.jobs) {
      const token = localStorage.getItem("jobs");
      decoded = jwt_decode(token);
      currentTime = Date.now() / 1000;
      if (!localStorage.jobs || decoded?.exp < currentTime) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, []);

  const handleForgotPassword = () => {
    alert("Forgot Password clicked");
    if (formik.values.email) {
      navigate("/resetpassword");
    } else {
      alert("Please fill in the email field before proceeding.");
    }
  };

  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${loginImage})`,
      }}
    >
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="form-label">
          Email address:
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </label>
        <label htmlFor="password" className="form-label">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </label>
        <button type="submit" className="btn btn-primary submit-button">
          Sign In
        </button>
        <p className="forgot-password">
          <a href="#" onClick={handleForgotPassword}>
            Forgot Password?
          </a>
        </p>
        <div className="signup">
          <p>Don't have an account?</p>
          <button
            type="button"
            className="btn btn-primary signup-button"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
