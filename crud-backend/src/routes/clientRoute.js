import express from 'express'
import * as clientController from '../controllers/clientContoller.js'

const router = express.Router();
router.get("/students", clientController.getStudent);   // read
router.post("/students", clientController.createStudent); // insert 
router.put("/students/:id", clientController.updateStudent); //update // :id is the req.params.id
router.delete('/students/:id', clientController.deleteStudent); // delete 
router.get("/students/search", clientController.searchClients);   // read

export default router;