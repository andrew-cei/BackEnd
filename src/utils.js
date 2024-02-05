import bcrypt from 'bcrypt';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Faker, es } from '@faker-js/faker';

// Proceso de Hasheo
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Proceso de comparación
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración de faker
const faker = new Faker({ locale: [es] });

export const generateProduct = () => {
    const product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        code: faker.commerce.isbn(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int({min: 0, max:1000}),
        category: faker.commerce.productAdjective(),
        thumbnail: []
    }
    return product;
}
