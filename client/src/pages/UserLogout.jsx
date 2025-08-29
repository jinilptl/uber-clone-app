import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  async function logout() {
    let token = JSON.parse(localStorage.getItem("token"));

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/user/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response is ", response);
    if (response.status === 200) {
      localStorage.removeItem("token");
      alert(response.data.message);
      navigate("/login");
    }

    // localStorage.removeItem('token')
  }

  if (token) {
    logout();
  }

  return <div>Logout</div>;
};

export default UserLogout;
