import React from "react";
import {Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = localStorage.getItem("user");
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate("/")
  }

  return (
    <div  className="profile">
      <h2>Profile</h2>
      {auth && JSON.parse(auth) ? (
        <div>
          <p>
            <strong>FirstName:</strong> {JSON.parse(auth).firstname}
          </p>
          <p>
            <strong>LastName:</strong> {JSON.parse(auth).lastname}
          </p>
          <p>
            <strong>Email:</strong> {JSON.parse(auth).email}
          </p>
         
          <button> <Link onclick={logout} to="/">Logout</Link></button>
        </div>
      
      ) : (
        "null"
      )}
      
    </div>
  );
};

export default Profile;
