const { uuid } = require("uuidv4");
const fs = require("fs");

// controller to get all users
exports.getUsers = (req, res, next) => {
  try {
    let users = fs.readFileSync("./data/users.json");
    res.status(200).json({ data: JSON.parse(users), status: "success" });
  } catch (error) {
    console.log("Error in reading file", error);
    res
      .status(500)
      .send({ error: "Unable to fetch users list", status: "fail" });
  }
};

// controller to get specific user
exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    let thisUser = users.filter((user) => {
      return user.id === userId;
    });
    if (thisUser.length === 0) {
      console.log(`User with id ${userId}, doesn't exist`);
      res.status(404).send({ error: "User doesn't exist", status: "fail" });
    } else {
      res.status(200).json({ data: thisUser[0], status: "success" });
    }
  } catch (error) {
    console.log("Error in reading file", error);
    res
      .status(500)
      .send({ error: "Unable to fetch users list", status: "fail" });
  }
};

// controller to add a new user
exports.addUser = (req, res, next) => {
  const newUserId = uuid();
  const newUser = {
    id: newUserId,
    ...req.body,
  };
  try {
    let users = [];
    try {
      users = JSON.parse(fs.readFileSync("./data/users.json"));
    } catch (getError) {
      console.log("getUsers Error: File could be empty ", getError);
    }
    users = users.concat([newUser]);
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync("./data/users.json", data);
    res.status(200).json({
      data: newUserId,
      msg: "User added successfully",
      status: "success",
    });
  } catch (error) {
    console.log("Error in writing file", error);
    res.status(500).send({ error: "Unable to add User", status: "fail" });
  }
};

// controller to edit an existing user
exports.editUser = (req, res, next) => {
  const userId = req.params.id;
  // console.log("edituser", req.body);
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    let userIndex;
    let thisUser = users.filter((user, index) => {
      if (user.id === userId) {
        userIndex = index;
        return true;
      }
      return false;
    });
    if (thisUser.length === 0) {
      console.log(`User with id ${userId}, doesn't exist`);
      res.status(404).send({ error: "User doesn't exist", status: "fail" });
    } else {
      users[userIndex] = {
        id: userId,
        age: req.body.age,
        name: req.body.name,
        address: req.body.address,
        location: req.body.location,
        gender: req.body.gender,
      };
      // console.log("new list", users);
      try {
        let data = JSON.stringify(users, null, 2);
        fs.writeFileSync("./data/users.json", data);
        res.status(200).json({
          data: users[userIndex],
          msg: "User Updated successfully",
          status: "success",
        });
      } catch (writeError) {
        console.log("Error in writing file", writeError);
        res
          .status(500)
          .send({ error: "Unable to edit users list", status: "fail" });
      }
    }
  } catch (error) {
    console.log("Error in reading file", error);
    res
      .status(500)
      .send({ error: "Unable to fetch users list", status: "fail" });
  }
};

// controller to delete an user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    let userIndex;
    let thisUser = users.filter((user, index) => {
      if (user.id === userId) {
        userIndex = index;
        return true;
      }
      return false;
    });
    if (thisUser.length === 0) {
      console.log(`User with id ${userId}, doesn't exist`);
      res.status(404).send({ error: "User doesn't exist", status: "fail" });
    } else {
      users.splice(userIndex, 1);
      console.log("new list", users);
      try {
        let data = JSON.stringify(users, null, 2);
        fs.writeFileSync("./data/users.json", data);
        res.status(200).json({
          data: users,
          msg: "User Deleted successfully",
          status: "success",
        });
      } catch (writeError) {
        console.log("Error in writing file", writeError);
        res
          .status(500)
          .send({ error: "Unable to edit users list", status: "fail" });
      }
    }
  } catch (error) {
    console.log("Error in reading file", error);
    res
      .status(500)
      .send({ error: "Unable to fetch users list", status: "fail" });
  }
};
