// Creación del Socket
const socket = io();
// Lectura inicial de datos
socket.emit('RequerirProductos','Request enviada')
// Actualiza la tabla con la información más reciente
socket.on('ActualizaTabla',data=>{
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
        ${product._id}
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
    // Lectura de datos del formulario
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let code = document.getElementById('code').value;
    let price = document.getElementById('price').value;
    let status = document.getElementById('status').value;
    let stock = document.getElementById('stock').value;
    let category = document.getElementById('category').value;
    // Verificación de los datos
    if (title === '' || description === '' || code === '' || price === '' || stock === '' || category === "") {
        alert('Llena todos los campos');
    }else {
        status === "true" ? status = true : status = false;
        // Creación del objeto de datos
        data = {
            'title': title,
            'description': description,
            'code': code,
            'price': parseFloat(price),
            'status': status,
            'stock': parseInt(stock),
            'category': category,
            'thumbnail':[]
        }
        // Envío de datos al servidor
        socket.emit('AgregarProducto', data)
    }
}
// Borrar producto
const Borrar = () =>{
    // Lectura de ID del formulario
    let id = document.getElementById('id').value;
    if (id === ''){
        alert('Favor de escribir un ID');
    } else{
        // Envío del ID al servidor
        socket.emit('BorrarProducto',{'id':id});
    }
}
