import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../Assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Helpers/UserContext";
import { useTheme } from "../Helpers/ThemeContext";

import Home from "../Pages/Home/Home";

const Navbar = () => {
  const { themeColor, handleToggleButton } = useTheme();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const imageUrl = user
    ? `http://localhost:4000/uploads/${user.userImage}`
    : "";

  const themeStyles = {
    backgroundColor: themeColor === "dark" ? "" : "white",
    color: themeColor === "dark" ? "#f9cc0b" : "black",
    marginRight: themeColor === "light" ? "10px" : "0",
  };

  const handleLogout = () => {
    localStorage.removeItem("jobs");
    navigate("/login");
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  return (
    <div className="navbar-container">
      <Nav className="custom-menu" variant="tabs" style={themeStyles}>
        <Row>
          <Col>
            <img src={logo} alt="Logo" className="logo" />
          </Col>

          <Col>
            <Nav.Item>
              <Nav.Link as={Link} to="/" style={themeStyles}>
                {" "}
                Home{" "}
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col>
            <Nav.Item>
              <Nav.Link as={Link} to="/getAllJobs" style={themeStyles}>
                Jobs
              </Nav.Link>
            </Nav.Item>
          </Col>
          <Col className="nav-item ml-auto mb-2">
            <label
              className="form-check form-switch"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                onChange={handleToggleButton}
                style={{ marginTop: "12px" }}
              />
            </label>
          </Col>
          <Col className="user-info" style={{ marginLeft: "750px" }}>
            {user && user.userName ? user.userName : "User"}
          </Col>
          <Col
            className=".user-image-responsive"
            style={{ marginTop: "-92px", marginLeft: "-100px" }}
          >
            <Dropdown
              show={showDropdown}
              onMouseEnter={handleDropdownToggle}
              onMouseLeave={handleDropdownClose}
            >
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{ background: "transparent", border: "none" }}
              >
                {user && user.userImage ? (
                  <img
                    src={imageUrl}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    alt="User"
                  />
                ) : null}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {user && user.isEmployer ? (
                  <Dropdown.Item as={Link} to="/jobListByEmployerId">
                    Job List
                  </Dropdown.Item>
                ) : null}
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Nav>
    </div>
  );
};

export default Navbar;
