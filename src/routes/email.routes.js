import { Router } from 'express';
import { sendMail } from '../controllers/email.controller.js';
import { validateLogIn } from '../middlewares/validateMiddleware.js';

const mailRouter = Router();

mailRouter.post('/send', validateLogIn, sendMail);

export default mailRouter;
