import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Logout = () => {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies();

    const logout = () => {
        Object.keys(cookies).forEach(key => {
            removeCookie(key);
        });
        navigate("/")
        window.location.reload();
        
    }

    // Invoke logout function when component renders
    React.useEffect(() => {
        logout();
    }, []); // Empty dependency array ensures the effect runs only once after initial render

    // No need to return anything from this component
    return null;
    
  }
  export default Logout;