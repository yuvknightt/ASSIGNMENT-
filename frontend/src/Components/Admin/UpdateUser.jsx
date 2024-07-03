import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../image/logo.png";
import axios from "axios"; // Import Axios for making HTTP requests

const UpdateUser = () => {
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const result = await fetch(`http://localhost:5000/users/${params.id}`);
      const data = await result.json();
      setfName(data.firstname);
      setlName(data.lastname);
      setEmail(data.email);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const result = await fetch(`http://localhost:5000/users/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ firstname: fname, lastname: lname, email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        alert("Successfully updated");
        navigate("/dash");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user details. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="left">
        <img src={logo} alt="SignUP" />
      </div>
      <div className="right">
        <form onSubmit={updateUser}>
          <div>
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              name="firstname"
              value={fname}
              onChange={(e) => setfName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              name="lastname"
              value={lname}
              onChange={(e) => setlName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="btn">
            <button className="btn1" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
