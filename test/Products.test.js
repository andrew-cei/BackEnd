import { initMongoDB } from '../src/dao/mongodb/Connection.js';
import ProductsDaoDB from '../src/dao/mongodb/ProductsDao.js';
import Assert from 'assert';
import {expect} from 'chai';

const assert = Assert.strict;

describe('Testing para productsController', () => {
    let productsDao;
    before(async function (){
        await initMongoDB();
        productsDao = new ProductsDaoDB();
    })
    beforeEach(function (){
        this.timeout(5000);
    })
    it('El Dao debe obtener una arreglo de productos',async () => {
        const result = await productsDao.getProducts();
        assert.strictEqual(Array.isArray(result), true);
    })
    it('El Dao debe obtener un producto por ID',async () => {
        const result = await productsDao.getProductById('65e7cf9fe6c23ab9261d16c4');
        assert.strictEqual(typeof(result), 'object');
    })
    it('El Dao debe actualizar un producto con precio y stock específicos',async () => {
        const newProduct = {
            price: 200,
            stock: 50
        }
        await productsDao.updateProduct('65e7cf9fe6c23ab9261d16c4', newProduct);
        const result = await productsDao.getProductById('65e7cf9fe6c23ab9261d16c4');
        assert.strictEqual(result.price, 200);
        assert.strictEqual(result.stock, 50);
    })
})