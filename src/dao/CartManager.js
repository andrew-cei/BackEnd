import {promises as fs} from 'fs'

export default class CartManager {
    constructor(path){
        this.path = path;
        this.carts = [];
    }
    // Obtener carrito por Id
    async getCart(id){
        this.carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        return this.carts.find(cart => cart.id === parseInt(id));
    }
    // Crear un carrito vacío con nueva Id
    async createCart() {
        this.carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const id = await this.idCart();
        this.carts.push({ id, products: [] });
        await fs.writeFile(this.path, JSON.stringify(this.carts));
    }
    // Agregar un producto al carrito
    async addPorductToCart(cid, pid) {
        this.carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        // Verificación de existencia de carritos
        if (!this.carts.length){
            console.log("No hay carritos todavía");
            return null
        }
        const cIndex = this.carts.findIndex(cart => cart.id === cid);
        // Búsqueda del carrito seleccionado
        if (cIndex === -1){
            console.log(`Carrito no encontrado`);
            return null
        }
        // Búsqueda del producto añadido
        const cart = this.carts[cIndex];
        const pIndex = cart.products.findIndex(product => product.id === pid);
        if (pIndex === -1) {
            this.carts[cIndex].products.push({ id: pid, quantity: 1 });
        } else {
            this.carts[cIndex].products[pIndex].quantity++;
        }

        await fs.writeFile(this.path, JSON.stringify(this.carts));
    }
    // Generar una nueva Id para cada carrito
    async idCart() {
        this.carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        if (this.carts.length < 1) return 1
        const ids = this.carts.map(cart => cart.id);
        const id = Math.max(...ids) + 1;
        return id
    }    
}