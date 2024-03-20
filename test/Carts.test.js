import { initMongoDB } from '../src/dao/mongodb/Connection.js';
import CartsDaoDB from '../src/dao/mongodb/CartsDao.js';
import {expect} from 'chai';

describe('Testing para productsController', () => {
    let cartsDao;
    before(async function (){
        await initMongoDB();
        cartsDao = new CartsDaoDB();
    })
    beforeEach(function (){
        this.timeout(5000);
    })
    it('El Dao debe obtener una arreglo de carritos',async () => {
        const result = await cartsDao.getCarts();
        expect(Array.isArray(result)).to.be.equals(true);
    })
    it('El Dao debe obtener un producto de un carrito por ID',async () => {
        const result = await cartsDao.getCart('65bfb93433b4b8e1afdc4f88');
        expect(typeof(result)).to.be.equals('object');
    })
    it('El Dao debe actualizar la cantidad de un producto',async () => {
        await cartsDao.updateQuantityProduct('65bfb93433b4b8e1afdc4f88','65e7cf9fe6c23ab9261d16c6', 10);
        const result = await cartsDao.getCart('65bfb93433b4b8e1afdc4f88');
        expect(result.products[0].quantity).to.be.equals(10);
    })
})