import React from 'react';

const NotFound = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      backgroundColor: "#757575",
      color: "#fff",  // Text color
      fontFamily: "Arial, sans-serif",  // Specify a font
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Error 404 - Not Found</h1>
      <p style={{ fontSize: "1.2rem" }}>The page you are looking for does not exist.</p>
      <p style={{ fontSize: "1rem" }}>You can go back to <a href="/">home</a> .</p>
    </div>
  );
};

export default NotFound;
