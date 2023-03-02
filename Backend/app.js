const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./Router/rutas");
const user = require("./Router/usersRouter");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/", router);
app.use("/user", user);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("La base de datos ha sido conectada");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(8080, () => {
  console.log("listening on port", 8080);
});
