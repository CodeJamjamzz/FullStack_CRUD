import * as catFactsController from '../controllers/catFactsController.js'
import express from 'express'

const router = express.Router();
router.get('/catfacts', catFactsController.getCatFacts)

export default router;