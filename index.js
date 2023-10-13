require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const studentsRouter = require("./routes/students");

app.use(express.json()); //Middleware from express on all requests
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/students", studentsRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("server listening");
});
