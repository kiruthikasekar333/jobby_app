import { useEffect } from 'react';
import './App.css';
import BaseRoutes from "./Routing/routes";
import { ThemeProvider } from './Helpers/ThemeContext';
import { AuthProvider } from './Helpers/UserContext';
import logo from"./Assets/logo1.png";


function App() {
  useEffect(() => {
    document.title = "JObee App";

  }, []);
  return (
    <ThemeProvider>
   <AuthProvider>
    
<BaseRoutes />

    </AuthProvider>
    </ThemeProvider>
 
    
  );
}

export default App;
