import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Logout = () => {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies();

    const logout = () => {
        Object.keys(cookies).forEach(key => {
            removeCookie(key);
            console.log(cookies)
            navigate("/")
        
        });
    }

    React.useEffect(() => {
        logout()
    }, []);
    
  }
  export default Logout;