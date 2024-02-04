// Agregar producto al carrito
async function addProduct(cid, pid) {
    await fetch(`/api/carts/${cid}/product/${pid}`, { method: 'POST' });
    // Actualiza el número de productos
    let counter = document.getElementById('counter');
    counter.innerHTML = parseInt(counter.innerHTML) + 1;
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
      });
    // Resetea el número de productos
    let counter = document.getElementById('counter');
    counter.innerHTML = 0;
}
