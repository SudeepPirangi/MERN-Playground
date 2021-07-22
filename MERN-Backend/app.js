const express = require("express");
const bodyParser = require("body-parser");

const router = require("./routes/router");

const PORT = process.env.PORT || 3200;
const app = express();

// REST configurations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());
app.use(router);

app.get("/", (req, res, next) => {
  let resJSON = { msg: "Here is ur response", status: "success" };
  res.status(200).send(resJSON);
});

app.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}`);
});
