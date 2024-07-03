import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = data.filter((item) => item.role === "user").slice(0, visibleItems);

  const deleteUser = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      result = await result.json();
      if (result) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setData(result);
      }
    } else {
      fetchData();
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
  };
  const makeuser=()=>{
    navigate("/adduser")
  }
  return (
    <>
      <div className="header">
        <div className="lft">
          <p>Home</p>
          <p onClick={makeuser}>Create User</p>
          <p onClick={logout}>Logout</p>
        </div>
        <div className="sz" onClick={() => setShowMenu(!showMenu)}>
          <MdOutlineMenu size={30} />
          {showMenu && (
            <div className="menu-items">
              <p onClick={() => setShowMenu(false)}>Home</p>
              <p onClick={() => setShowMenu(false)}>Create User</p>
              <p onClick={logout}>Logout</p>
            </div>
          )}
        </div>
        <div className="rht">
          <input
            type="text"
            placeholder="Search User"
            onChange={searchHandle}
          />
        </div>
      </div>
      <div className="bottom">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => deleteUser(item._id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => handleUpdate(item._id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleItems < data.length && (
          <p onClick={loadMore}>Load More</p>
        )}
      </div>
    </>
  );
};

export default DashBoard;
