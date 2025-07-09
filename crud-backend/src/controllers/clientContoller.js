import * as clientServices from "../services/clientServices.js";

// 200 (OK) → The request was successful. Everything worked as expected.
// 500 (Internal Server Error) → Something went wrong on the server side.

export const getStudent = async (req, res) => {
  try {
    const students = await clientServices.getStudent(); // refers to the data read from the db
    res.status(200).json(students); // put data in jason to pass
  } catch (err) {
    console.error("unable to get students data", err);
    res.status(500).json({ message: "error has occured" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = req.body; // refers to all passed from client-side
    const newStudent = await clientServices.createStudent(student);
    res.status(200).json(newStudent);
  } catch (err) {
    console.error("unable to get students data", err);
    res.status(500).json({ message: "error has occured" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const studentId = req.params.id;
    const updatedStudent = await clientServices.updateStudent(
      studentData,
      studentId
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "client is not found" });
    }
    return res.status(200).json(updatedStudent);
  } catch (err) {
    console.error("unable to update students data", err);
    res.status(500).json({ message: "error has occured" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await clientServices.deleteStudent(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: "client is not found" });
    }
    return res.status(200).send();
  } catch (err) {
    console.error("unable to delete student", err);
    res.status(500).json({ message: "error has occured" });
  }
};

export const searchClients = async (req, res) => {
  try {
    const searchTerm = req.query.q; // Get the search term from the query parameters
    const clients = await clientServices.searchClients(searchTerm);
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error searching clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


