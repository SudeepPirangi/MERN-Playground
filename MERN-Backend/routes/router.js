const express = require("express");
const controller = require("../controller/appController");

const router = express.Router();

router.get("/getUsers", controller.getUsers);

router.get("/users/:id", controller.getUser);

router.post("/addUser", controller.addUser);

router.put("/editUser/:id", controller.editUser);

router.delete("/deleteUser/:id", controller.deleteUser);

module.exports = router;
