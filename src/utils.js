import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

// Proceso de Hasheo
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Proceso de comparación
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const __dirname = dirname(fileURLToPath(import.meta.url));