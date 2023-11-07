import express from 'express';
import {__dirname} from './utils.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import prodsRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import ProductManager from './classes/ProductManager.js';
// Creación de variables
const productsPath = "./src/data/productos.json";
// Creación del Product Manager
const manager = new ProductManager(productsPath);

// Configuración inicial
const app = express()
const PORT = 8080

// Motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname + '/views');
app.set('view engine', 'handlebars');

// Uso de JSON
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/', viewsRouter);
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartRouter)

// Configuraciónn del puerto 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})

// Creación del servidor con websockets
const io = new Server(httpServer);

io.on('connection',socket=>{
    console.log("Nuevo cliente conectado");

    socket.on('EnviarProducto', async data=>{
        const products = await manager.getProducts();
        io.emit('ActualizaTabla',products)
    })

    socket.on('BorrarProducto', async data=>{
        const products = await manager.getProducts();
        io.emit('ActualizaTabla',products)
    })
})