import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

let currentTime;
let decoded;

if(localStorage.jobs){
    const token =localStorage.getItem("jobs");
    decoded = jwt_decode(token);
    console.log("decoded token: ", decoded)
    currentTime =Date.now()/1000;
}

const ProtectedRoute =({children}) =>{
if(!localStorage.jobs|| decoded?.exp < currentTime)
{
    return <Navigate to = "/login" />
}
return children;
}

 export default ProtectedRoute;

