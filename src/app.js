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
// Bibliotecas propias
import './dao/mongodb/Connection.js';
import prodsRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import userRouter from './routes/users.routes.js';
import ProductManager from './dao/filesystem/ProductDao.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { MONGO_URL, initMongoDB } from './dao/mongodb/Connection.js';
import './config/github-strategy.js';
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
// Creación del Product Manager
const manager = new ProductManager(productsPath);

// Configuración inicial
const app = express()
const PORT = 8080
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

// Rutas principales
app.use('/', viewsRouter);
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', userRouter)
app.use(errorHandler);

// Configuraciónn del puerto 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})

// Creación del servidor con websockets
const io = new Server(httpServer);

io.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    socket.on('EnviarProducto', async data => {
        const products = await manager.getProducts();
        io.emit('ActualizaTabla', products)
    })

    socket.on('BorrarProducto', async data => {
        const products = await manager.getProducts();
        io.emit('ActualizaTabla', products)
    })
})