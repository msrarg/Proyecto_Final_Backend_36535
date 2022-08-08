const buttonAddContentComplete = `Agregar al carrito`;
const buttonAddContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonAddContentComplete}`;

//Evento que se ejecuta cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
    loadInitialData();
});

const loadInitialData = async () => {
    const response = await fetch("/api/productos");
    const products = await response.json();
    generarViewDashboard(products);
    const productosCarrito = await generarCarrito();
    document.querySelector('#badgeCantProductos').innerHTML = productosCarrito.length;
}

const generarViewDashboard = (items) => {
    fetch('/templates/articulos.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ items })
        document.getElementById('productosList').innerHTML = html

        const addButtons = document.querySelectorAll('.add-button');

        addButtons.forEach(button => {
          button.addEventListener('click', (e)=> {
            agregarProducto(e.target,e.target.getAttribute("data-id"));
          });
        });
    })
}
