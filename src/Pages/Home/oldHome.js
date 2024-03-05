import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { useTheme } from "../../Helpers/ThemeContext";
import homeLight from"../../Assets/HomeLightImg.jpg"
import homeDark from "../../Assets/HomeDarkImg.jpg"

const Home = () => {
  const theme = useTheme();
  console.log('Current Theme:', theme);
  console.log('Home Light Image:', homeLight);
  console.log('Home Dark Image:', homeDark);


  const highlights = [
    {
      title: <span className="highlight-title">For Employers</span>,
      description: (
        <div className="highlight-description">
          Job Posting: Employers can easily create and post job listings, specifying job titles, descriptions, qualifications, and other details.
          <br />
          Applicant Tracking: Streamline your hiring process by managing and tracking all incoming job applications in one place.
        </div>
      ),
    },
    {
      title: <span className="highlight-title">For Job Seekers</span>,
      description: (
        <div className="highlight-description">
          Job Search: Job seekers can search for job openings by keyword, location, industry, and other relevant criteria.
          <br />
          <br />
          Resume Posting: Easily upload and showcase your resume to potential employers.
        </div>
      ),
    },
    {
      title: <span className="highlight-title">General Features</span>,
      description: (
        <div className="highlight-description">
          User Authentication: Secure login and registration processes for both employers and job seekers.
          <br />
          Notifications: Stay updated with automated notifications for job updates and application status changes.
          <br />
          <br />
          Mobile Accessibility: Access the platform on the go with mobile apps for job searching and recruitment management.
        </div>
      ),
    },
        
    
    // Add more highlights as needed
  ];

  // State to track the current highlight
  const [currentHighlight, setCurrentHighlight] = useState(0);

  useEffect(() => {
    // Automatically switch to the next highlight every 3 seconds
    const interval = setInterval(() => {
      setCurrentHighlight((prevHighlight) => (prevHighlight + 1) % highlights.length);
    }, 5000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <div
      className="main-container"
      style={{
        backgroundImage: theme.themeColor === 'dark' ? `url(${homeDark})` : `url(${homeLight})`,
      }}
    >
    <div className="home-container">
      <div className="content">
        <h3>HIGHLIGHTS:</h3>
        <div className="carousel">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentHighlight ? "active" : ""
              }`}
            >
              <h2>{highlight.title}</h2>
              <p>{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
