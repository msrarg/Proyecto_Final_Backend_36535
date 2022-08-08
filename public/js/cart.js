const buttonAddContentComplete = `+`;
const buttonAddContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
const buttonDeleteContentComplete = `-`;
const buttonDeleteContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
const buttonOrderContentComplete = `Finalizar compra`;
const buttonOrderContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonOrderContentComplete}`;

const btnFinalizarCompra = document.querySelector('#btnFinalizarCompra');

//Evento que se ejecuta cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
    loadInitialData();
});

const loadInitialData = async () => {
    const productosCarrito = await generarCarrito();
    generarViewCarrito(productosCarrito);
}

const generarViewCarrito = (items) => {
    fetch('/templates/carrito.hbs')
    .then(response => response.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const totalCarrito = items.length ? items.map(item => item.total).reduce((prev, next) => prev + next) : 0;
        const html = template({ items, totalCarrito })
        document.getElementById('productosList').innerHTML = html
        document.querySelector('#badgeCantProductos').innerHTML = items.length;
        btnFinalizarCompra.disabled = items.length > 0 ? false : true ;

        const addButtons = document.querySelectorAll('.add-button');

        addButtons.forEach(button => {
          button.addEventListener('click', (e)=> {
            agregarProducto(e.target,e.target.getAttribute("data-id"),true);
          });
        });

        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
          button.addEventListener('click', (e)=> {
            eliminarProducto(e.target,e.target.getAttribute("data-id"));
          });
        });
    })
}

btnFinalizarCompra.addEventListener('click', (e)=> {
    Swal.fire({
        title: '¿Desea confirmar la compra?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar compra',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            finalizarCompra(btnFinalizarCompra)
        }
    })
});

