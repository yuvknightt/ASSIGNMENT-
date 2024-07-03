import React, { useState } from "react";
import logo from "../image/logo.png";
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    // gender: "male",
  });
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      // console.log(response.data);
      navigate("/dash");
    } catch (error) {
      // console.error("Error:", error);
      alert(error.response.data);
    }
  };

  return (
    <div className="main">
      <div className="left">
        <img src={logo} alt="SignUP" />
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="firstname"
              placeholder="firstName"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="lastname"
              placeholder="lastName"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="btn">
            <button className="btn1" type="submit">
            Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
