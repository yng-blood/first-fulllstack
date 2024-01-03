//app.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001", // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

require("./connection/connect");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.get("/", (req, res) => {
  res.send({ users: username });
});

app.use(express.json());
app.use("/app", auth);
// app.use("/app",auth);
app.use("/api", list);
const Port = 5000;
app.listen(Port, () => {
  console.log(`server is running at ${Port}`);
});
