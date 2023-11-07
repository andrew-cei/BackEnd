// Creación del Socket
const socket = io();
// Lectura inicial de datos
socket.emit('EnviarProducto','Info enviada')
// Actualiza la tabla con la información más reciente
socket.on('ActualizaTabla',data=>{
    console.log(data)
    let listaProductos = document.getElementById('Productos');
    let texto = 
    `<tr>
    <th>ID</th>
    <th>Título</th>
    <th>Descripción</th>
    <th>Precio</th>
    <th>Código</th>
    <th>Stock</th>
    </tr>`;
    data.forEach(product=>{
        texto = texto + 
        `<tr>
        <td>
        ${product.id}
        </td>
        <td>
        ${product.title}
        </td>
        <td>
        ${product.description}
        </td>
        <td>
        ${product.price}
        </td>
        <td>
        ${product.code}
        </td>
        <td>
        ${product.stock}
        </td>
        </tr>`
    })
    listaProductos.innerHTML = texto;
})
// Agragar producto
const Enviar = () =>{
    socket.emit('EnviarProducto','Info enviada')
}
// Borrar producto
const Borrar = () =>{
    socket.emit('BorrarProducto','Info enviada')
}