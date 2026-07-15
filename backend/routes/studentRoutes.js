const express = require("express");
const {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudent,getStudentsWithPagination
} = require("../controllers/studentController");

const router = express.Router();

// CREATE
router.post("/", addStudent);

// READ ALL
router.get("/", getAllStudents);

// SEARCH (must be before /:id)
router.get("/search", searchStudent);

router.get("/pagination", getStudentsWithPagination);
// READ ONE
router.get("/:id", getStudentById);

// UPDATE
router.put("/:id", updateStudent);

// DELETE
router.delete("/:id", deleteStudent);


module.exports = router;