const express = require("express");
const Router = express.Router();

const { rosterDB } = require("../db");
const { validateExists, validateFields } = require("../middleware");

Router.get("/id/:userId", (req, res) => {
    const { userId } = req.params;
    const student = rosterDB.getStudentById(userId);

    if (!student) {
        return res.status(404).json({ error: `no student with id: ${userId}` });
    }

    res.send(student);
});
/*
 * -READ
    GET /api/students
    GET /api/students?name&location

*/
Router.get("/", (req, res) => {
    res.send(rosterDB.getStudentQuery(req.query));

    // 1 line vs many lines

    // let results = rosterDB.getStudentByNameLocation({ name, location });

    // res.send(results);
});

/*
-CREATE
    POST /api/students
       {name, location}
*/
Router.post("/", validateFields, async (req, res) => {
    try {
        const newStudent = await rosterDB.addStudent(req.body);
        res.send(newStudent);
    } catch (error) {
        res.status(500).json({ error: "photo retrieval unavailable at this time" });
    }

    // 1 line vs many
    // const { name, location } = req.body;

    // const newStudent = rosterDB.addStudent({ name, location });
    // res.send(newStudent);
});

/*
-UPDATE
    PUT /api/students/<name>        (named route parameter)
    {name?, location?}
*/
//Router.put("/:name", validateFields, validateExists, (req, res) => {
Router.put("/id/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const updatedStudent = await rosterDB.updateStudent(userId, req.body);

        if (!updatedStudent) {
            return res.status(404).json({ error: `no student with id: ${userId}` });
        }

        return res.send(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: "photo retrieval unavailable at this time" });
    }
});

// const matchedIndexs = [];
// console.log("Matched Index: ", matchedIndexs);
// for (let index = 0; index < rosterDB.length; index++) {
//     if (rosterDB[index].name === searchedName) {
//         matchedIndexs.push(index);
//     }
// }
// console.log("Matched Index: ", matchedIndexs);
// matchedIndexs.forEach((index) => {
//     if (name) {
//         rosterDB[index].name = name;
//     }

//     if (location) {
//         rosterDB[index].location = location;
//     }
// });

/*
-DELETE
    DELETE /api/student/<name>
*/
//Router.delete("/:name", validateExists, (req, res) => {
Router.delete("/id/:userId", (req, res) => {
    const { userId } = req.params;

    rosterDB.deleteStudent(userId);

    return res.send(rosterDB);
});

module.exports = Router;
