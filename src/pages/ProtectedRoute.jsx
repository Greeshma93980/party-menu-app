import { useContext } from "react";
import {Navigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({children})
{
    const {isAuthenticated}=useContext(AuthContext);
    if(isAuthenticated===false)
    {
        return <Navigate to="/sigin" replace={true}/>;
    }
    return children;
}