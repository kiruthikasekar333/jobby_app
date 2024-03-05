import { useState } from "react";
import loginImage from "../Assets/login.jpg";
import { useNavigate } from "react-router-dom";


export default function ResetPassword () {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate= useNavigate();

  const handleNewPasswordChange =(e) => {
    setNewPassword(e.target.value);
  }

  const handleConfirmPasswordChange =(e) =>{
    setConfirmPassword(e.target.value);
  
}
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the new password matches the confirmed password
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Reset the password logic goes here

    // Clear the form inputs
    setNewPassword("");
    setConfirmPassword("");

    // Show success message or navigate to another page
    alert("Password reset successful");
    navigate("/login")
    
  };

  return (
    <div style={{height: "800px",
        backgroundImage: `url(${loginImage})`,
        backgroundSize:"cover", padding: "100px"}}>
      
      <form style={{
          width: "400px",
          height: "350px",
          marginLeft: "950px",
          backgroundColor: "rgba(252, 211, 77, 0.8)", 
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          fontFamily: "sans-serif",
          fontSize: "18px",
          alignItems: "center",
          textAlign: "center"
        }}
        
      onSubmit={handleSubmit}>
        <div>
          <label htmlFor="exampleInputEmail1">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            placeholder=""
            className="form-control"
          style={{ marginTop: "10px", width: "200px" }}
          />
        </div>
        <div>
          <label htmlFor="exampleInputEmail1">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            
            style={{ marginTop: "10px", width: "200px", margin:'auto' }}
          />
          <div style={{ width: "250px"}}>
          <p style={{fontSize:'12px', color: "gray", textAlign: "justify", marginTop:'20px', fontStyle: "normal"}}>
          Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter. 
          </p>
          </div>
          
        </div>
        <button type="submit"
          className="btn btn-primary"
          style={{ width: "100px", fontSize: "18px" }}>Confirm</button>
      </form>
    </div>


    
    
      );
};


