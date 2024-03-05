import { createContext, useContext, useState, useEffect } from "react";
import setAuthToken from "../Utils/SetAuthToken"
import jwt_decode from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  console.log(user, ": user details at contextApi file")
  const checkAuthentication = async () => {
    const token = localStorage.getItem("jobs");
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        setAuthToken(token);
        await setUser(decoded); // Make sure setUser is resolved before proceeding
      } else {
        setAuthToken(null);
        setUser(null);
      }
    } else {
      setAuthToken(null);
      setUser(null);
    }
    setLoading(false); // Set loading to false after authentication check
  };

  useEffect(() => {
    checkAuthentication(); // Call the authentication check function

    // Clean-up function
    return () => setLoading(true); // Reset loading to true when the component unmounts
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, // Pass user information to the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
