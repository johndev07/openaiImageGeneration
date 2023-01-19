const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

//enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openaiRoutes"));
app.get("/", (req, res) => {
  console.log("i am at home page here");
  res.status(200).json({ sucess: true });
});

app.listen(PORT, () => {
  console.log("app started");
});
