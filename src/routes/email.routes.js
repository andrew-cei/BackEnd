import { Router } from 'express';
import { sendMail } from '../controllers/email.controller.js';

const mailRouter = Router();

mailRouter.post('/send', sendMail);

export default mailRouter;
