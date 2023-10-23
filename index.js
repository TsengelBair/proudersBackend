const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes.js");
const app = express();
const PORT = config.get("serverPort");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));

    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (e) {}
};

start();
