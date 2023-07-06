import express from 'express';
import { getInfo, getInfos, sendInfo } from '../controller/contactInfoController.js';

const router=express.Router();
router.post('/sendInfo',sendInfo);
router.get('/getInfos', getInfos);
router.get('/getInfo/:id',getInfo);
export default router;