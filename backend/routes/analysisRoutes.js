import express from 'express';
import { analyzeWebsite } from '../controllers/analysisController.js';

const router = express.Router();

router.post('/analyze', analyzeWebsite);

export default router;
