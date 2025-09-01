import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const UserProtectedWrapper = ({ children }) => {
  let { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("token in the userProtected ",token);
  
  async function fetchUserProfile() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/profile`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        );
      console.log("response is ", response);

      if (response.status === 200) {
        alert("successfully fetched user profile");
        setUser(response.data.data.user);
      }
    } catch (error) {
      navigate("/login");
      localStorage.removeItem("token");
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    fetchUserProfile()
  }, [token]);

  return children;
};

export default UserProtectedWrapper;
