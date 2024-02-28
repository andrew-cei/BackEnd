// Bibliotecas propias de Express
import express from 'express';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import session from 'express-session';
import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import MongoSotre from 'connect-mongo';
import { Command } from 'commander';
// Bibliotecas propias
import './dao/mongodb/Connection.js';
import mailRouter from './routes/email.routes.js';
import Product from './dao/Product.js';
import ProductsServices from './services/products.services.js';
import prodsRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import userRouter from './routes/users.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { MONGO_URL, initMongoDB } from './dao/mongodb/Connection.js';
import './config/github-strategy.js';
import { addDevLogger, addProdLogger } from './logger.js';
// Creación de variables
const productsPath = "./src/data/productos.json";
const mongoStoreOptions = {
    store: MongoSotre.create({
        mongoUrl: MONGO_URL,
        ttl: 600
    }),
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 600000
    }
}

// Configuración de commander
const commander = new Command();
commander
    .option('-p <port>', 'port server', 8080)
    .option('-m <mode>', 'mode server', 'dev')
    .option('-db <database>', 'database', 'mongo')
commander.parse();
// Inicialización de parámetros
const PORT = commander.opts().p;
const mode = commander.opts().m;
const db = commander.opts().Db;
console.log(PORT, mode, db);
// Selección del logger, dev o prod
let addLogger = null;
mode === 'dev' ? addLogger = addDevLogger : addLogger = addProdLogger;

// Configuración inicial
const app = express()
initMongoDB();

// Motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configuración de Middlewares
app.use(express.json());
app.use(cookieParser("CoderS3cR3tC0D3"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(session(mongoStoreOptions));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(addLogger);

// Rutas principales
app.use('/', viewsRouter);
app.use('/api', mailRouter);
app.use('/api/products', prodsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);

// Configuraciónn del puerto 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})

// Creación del servidor con websockets
const io = new Server(httpServer);
const productsServices = new ProductsServices();

io.on('connection', socket => {
    console.log("Nuevo cliente conectado");
    // Requerir lista de productos
    socket.on('RequerirProductos', async data => {
        console.log('data: ',data);
        const products = await productsServices.getAllProducts();
        io.emit('ActualizaTabla', products)
    })
    // Agregar un producto a la lista
    socket.on('AgregarProducto', async data => {
        const { title, description, code, price, status, stock, category, thumbnails } = data;
        const product = new Product(title, description, category, price, thumbnails, code, stock, status);
        await productsServices.addProduct(product);
        const products = await productsServices.getAllProducts();
        io.emit('ActualizaTabla', products)
    })
    // Borrar un producto de la lista
    socket.on('BorrarProducto', async data => {
        const {id} = data;
        const isProduct = await productsServices.getProductById(id);
        if (isProduct) {
            await productsServices.deleteProduct(id);
        }
        const products = await productsServices.getAllProducts();
        io.emit('ActualizaTabla', products)
    })
})
