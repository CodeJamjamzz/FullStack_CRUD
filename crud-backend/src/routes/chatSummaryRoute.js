import express from 'express'
import * as aiController from '../controllers/aiController.js'

const router = express.Router()
router.post('/students/summary', aiController.getSummary)
console.log('checking')
export default router;