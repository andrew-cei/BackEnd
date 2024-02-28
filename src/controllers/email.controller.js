import { transporter, mailOptions } from '../services/email.service.js';

export const sendMail = async (req, res) => {
    try {
        const response = await transporter.sendMail(mailOptions);
        console.log('email enviado');
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}
