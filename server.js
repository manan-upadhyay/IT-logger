const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5500;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
// });

//Define Routes
app.use("/api/logs", require("./routes/logs"));
app.use("/api/techs", require("./routes/techs"));

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
