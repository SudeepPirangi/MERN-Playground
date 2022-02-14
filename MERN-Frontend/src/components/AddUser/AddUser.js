import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddUser = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    address: "",
    location: "",
    gender: "M",
  });

  let formErrors = {
    name: {
      msg: "",
      valid: true,
    },
    age: {
      msg: "",
      valid: true,
    },
    address: {
      msg: "",
      valid: true,
    },
    location: {
      msg: "",
      valid: true,
    },
    gender: {
      msg: "",
      valid: true,
    },
  };

  const [formValidator, setFormValidator] = useState(formErrors);

  const inputChangeHandler = (ev) => {
    let temp = {
      [ev.target.name]: ev.target.value,
    };
    setFormData({ ...formData, ...temp });
    // console.log(formData);
  };

  const validateForm = () => {
    let flag = false;
    let numeric = /^[0-9]*$/;

    console.log("formData", formData);

    // validating name field
    if (formData.name.length === 0) {
      formErrors.name.msg = "Name cannot be empty";
      formErrors.name.valid = false;
      flag = true;
    } else if (formData.name.length > 100) {
      formErrors.name.msg = "Name cannot be more than 100 characters";
      formErrors.name.valid = false;
      flag = true;
    } else {
      formErrors.name.msg = "";
      formErrors.name.valid = true;
    }

    // validating age field
    if (formData.age.length === 0) {
      formErrors.age.msg = "Age cannot be empty";
      formErrors.age.valid = false;
      flag = true;
    } else if (formData.age <= 0 || formData.age > 99 || !numeric.test(formData.age)) {
      formErrors.age.msg = "Age must be between 0 & 99";
      formErrors.age.valid = false;
      flag = true;
    } else {
      formErrors.age.msg = "";
      formErrors.age.valid = true;
    }

    // validating address field
    if (formData.address.length > 250) {
      formErrors.address.msg = "Address cannot be more than 250 characters";
      formErrors.address.valid = false;
      flag = true;
    } else {
      formErrors.address.msg = "";
      formErrors.address.valid = true;
    }

    // validating location field
    if (formData.location.length === 0) {
      formErrors.location.msg = "Location cannot be empty";
      formErrors.location.valid = false;
      flag = true;
    } else if (formData.location.length > 100) {
      formErrors.location.msg = "Location cannot be more than 100 characters";
      formErrors.location.valid = false;
      flag = true;
    } else {
      formErrors.location.msg = "";
      formErrors.location.valid = true;
    }

    console.log("validation complete", formErrors);
    setFormValidator(formErrors);

    return flag;
  };

  const addUserHandler = (ev) => {
    ev.preventDefault();
    setFormData({
      name: ev.target.name.value,
      age: ev.target.age.value,
      address: ev.target.address.value,
      location: ev.target.location.value,
      gender: ev.target.gender.value,
    });
    if (!validateForm()) {
      console.log("form Valid");

      axios
        .post("http://localhost:3200/addUser", formData)
        .then((response) => {
          console.log("Post successful", response);
          //resetting form
          setFormData({
            name: "",
            age: 0,
            address: "",
            location: "",
            gender: "M",
          });
          document.getElementById("addUserForm").reset();
          alert("User Added Successfully");
        })
        .catch((err) => {
          console.log("Error while adding user", err.data);
          alert("Error while adding user", err.data);
        });
    } else {
      console.log("Invalid form");
    }
  };

  return (
    <div className="col-xs-12 col-sm-offset-3 col-sm-6  col-lg-offset-4 col-lg-4">
      <h1 className="pageTitle">Add New User</h1>
      <form id="addUserForm" onSubmit={addUserHandler}>
        <div className="form-group">
          <label htmlFor="name">
            Name<sup className="must">*</sup> :
          </label>
          <input
            type="text"
            className={!formValidator.name.valid ? "form-control errorField" : "form-control"}
            id="name"
            name="name"
            onChange={inputChangeHandler}
          />
          <span className="errorMsg">{!formValidator.name.valid ? formValidator.name.msg : ""}</span>
        </div>
        <div className="form-group">
          <label htmlFor="age">
            Age<sup className="must">*</sup> :{" "}
          </label>
          <input
            type="text"
            className={!formValidator.age.valid ? "form-control errorField" : "form-control"}
            id="age"
            name="age"
            onChange={inputChangeHandler}
          />
          <span className="errorMsg">{!formValidator.age.valid ? formValidator.age.msg : ""}</span>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address: </label>
          <textarea
            className={!formValidator.address.valid ? "form-control errorField" : "form-control"}
            id="address"
            name="address"
            rows="3"
            onChange={inputChangeHandler}
          ></textarea>
          <span className="errorMsg">{!formValidator.address.valid ? formValidator.address.msg : ""}</span>
        </div>
        <div className="form-group">
          <label htmlFor="location">
            Location<sup className="must">*</sup> :{" "}
          </label>
          <input
            type="text"
            className={!formValidator.location.valid ? "form-control errorField" : "form-control"}
            id="location"
            name="location"
            onChange={inputChangeHandler}
          />
          <span className="errorMsg">{!formValidator.location.valid ? formValidator.location.msg : ""}</span>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender: </label>
          <select
            className={!formValidator.gender.valid ? "form-control errorField" : "form-control"}
            id="gender"
            name="gender"
            onChange={inputChangeHandler}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <span className="errorMsg">{!formValidator.gender.valid ? formValidator.gender.msg : ""}</span>
        </div>
        <button type="submit" className="btn btn-danger btn-block" style={{ marginTop: 20 }}>
          Add User
        </button>
        <Link to="/" className="btn btn-primary btn-block" style={{ marginTop: 20 }}>
          Home
        </Link>
      </form>
    </div>
  );
};

export default AddUser;
