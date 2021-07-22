import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ViewUsers = (props) => {
  const [users, setUsers] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3200/getUsers")
      .then((response) => {
        let apiResponse = response.data;
        setUsers(apiResponse.data);
        // console.log("All users", users);
      })
      .catch((err) => {
        console.log("Error in fetching users list", err);
      });
  }, []);

  const redirectUser = (userId) => {
    history.push(`/user/${userId}`);
  };

  return (
    <Fragment>
      <h1 className="pageTitle">Users List</h1>
      <div id="usersList" className="col-xs-12 col-sm-offset-3 col-sm-6">
        <table className="table table-responsive table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Location</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr onClick={() => redirectUser(user.id)} key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td>{user.location}</td>
                  <td>{user.gender === "M" ? "Male" : "Female"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ViewUsers;
