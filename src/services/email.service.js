import { createTransport } from 'nodemailer';
import config from '../../config.js';

/*export const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mozell.glover67@ethereal.email',
        pass: 'VWq8UCeYAAqQM1PpxX'
    }
});*/

export const transporter = createTransport({
    host: config.HOST,
    port: config.EMAIL_PORT,
    auth: {
        user: config.USER,
        pass: config.PASS
    }
});

export const mailOptions = {
    from: config.USER,
    to: "andrew.cei@comunidad.unam.mx",
    subject: 'Bienvenida',
    text: 'Bienvenido a coderhouse'
};
