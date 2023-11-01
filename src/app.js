import express from 'express'
import prodsRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'

// Configuración inicial
const app = express()
const PORT = 8080

// Uso de JSON
app.use(express.json())

// Página de inicio
app.get('/', (req, res) => {
    res.send('Bienvenido a mi tienda')
})

// Rutas principales
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartRouter)

// Configuraciónn del puerto 8080
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})