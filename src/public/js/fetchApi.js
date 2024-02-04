// Agragar producto
async function updateProduct() {
    // Selección de elementos del formulario
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let code = document.getElementById('code');
    let price = document.getElementById('price');
    let status = document.getElementById('status');
    let stock = document.getElementById('stock');
    let category = document.getElementById('category');
    // Verificación de los datos
    if (title.value === '' || description.value === '' || code.value === '' || price.value === '' || stock.value === '' || category.value === "") {
        Swal.fire('Llena todos los campos');
    } else {
        status === "true" ? status = true : status = false;
        // Creación del objeto de datos
        data = {
            'title': title.value,
            'description': description.value,
            'code': code.value,
            'price': parseFloat(price.value.slice(1)),
            'status': status,
            'stock': parseInt(stock.value),
            'category': category.value,
            'thumbnail': []
        }
        // Envío de datos al servidor
        let pid = localStorage.getItem('Product Id');
        if (pid) {
            localStorage.removeItem('Product Id');
            // Actualización del producto       
            await fetch(`/api/products/${pid}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } else {
            // Creación del producto
            await fetch(`/api/products/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }
        Swal.fire('Producto actualizado').then( () => {
            location.reload();
        });
    }
}

// Agregar producto al carrito
async function addProductToCart(cid, pid) {
    await fetch(`/api/carts/${cid}/product/${pid}`, { method: 'POST' });
    // Actualiza el número de productos
    let counter = document.getElementById('counter');
    counter.innerHTML = parseInt(counter.innerHTML) + 1;
}

// Editar producto
function editProduct(pid) {
    // Selección de elementos del formulario
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let code = document.getElementById('code');
    let price = document.getElementById('price');
    let stock = document.getElementById('stock');
    let category = document.getElementById('category');
    // Actualización de elementos
    let formTitle = document.getElementById('form_title');
    let submit = document.getElementById('sbm-btn');
    formTitle.innerHTML = 'Editar producto';
    submit.innerHTML = 'Actualizar';
    // Actualización de datos del formulario
    let product = document.getElementById(pid);
    title.value = product.cells[1].innerHTML;
    description.value = product.cells[2].innerHTML;
    category.value = product.cells[3].innerHTML;
    price.value = product.cells[4].innerHTML;
    code.value = product.cells[5].innerHTML;
    stock.value = product.cells[6].innerHTML;
    // Agregar el ID del producto a localstorage
    localStorage.setItem('Product Id', pid);
}

// Borrar producto
async function deleteProduct(pid) {
    await fetch(`/api/products/${pid}`, { method: 'DELETE' });
    Swal.fire('Producto borrado').then( () => {
        location.reload();
    });
}

// Realizar compra de productos
async function buyProducts(cid) {
    let ticketObj = await fetch(`/api/carts/${cid}/purchase`, { method: 'POST' });
    let ticket = await ticketObj.json();
    // Muestra el Ticket
    const texto = `
    <p>Código de compra: ${ticket.code}</p>
    <p>Fecha: ${ticket.purchase_datetime}</p>
    <p>Costo: ${ticket.amount}</p>
    <p>Comprador: ${ticket.purchaser}</p>
    `
    Swal.fire({
        title: "Tu ticket",
        html: texto,
    }).then( () => {
        location.reload();
    });
}
