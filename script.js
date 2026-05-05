// 1. Iniciamos el carrito vacío
let carrito = [];

// 2. Referencias a los elementos del HTML
const listaCarrito = document.getElementById('lista-carrito');
const totalPrecioTxt = document.getElementById('total-precio');

// 3. Seleccionamos todos los botones que acabas de crear
const botonesAgregar = document.querySelectorAll('.btn-agregar');

// 4. Función para actualizar lo que el cliente ve en el carrito
function actualizarInterfaz() {
    listaCarrito.innerHTML = '';
    let sumaTotal = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li class="vacio">El carrito está vacío</li>';
    } else {
        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.marginBottom = "10px";
            
            li.innerHTML = `
                <span>${producto.nombre} (C$ ${producto.precio})</span>
                <button onclick="quitarDelCarrito(${index})" style="color: red; border: none; background: none; cursor: pointer;">[Quitar]</button>
            `;
            listaCarrito.appendChild(li);
            sumaTotal += producto.precio;
        });
    }

    totalPrecioTxt.innerText = sumaTotal;
}

// 5. Escuchar los clics para agregar productos
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.getAttribute('data-nombre');
        const precio = parseInt(boton.getAttribute('data-precio'));

        // Agregamos al arreglo
        carrito.push({ nombre, precio });
        
        // Actualizamos la vista
        actualizarInterfaz();
    });
});

// 6. Función para eliminar un producto si el cliente se arrepiente
function quitarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarInterfaz();
}

// 7. Función final: Enviar pedido a WhatsApp
function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("¡Tu carrito está vacío! Elige algo rico primero.");
        return;
    }

    // El número de teléfono debe llevar el código de país (505 para Nicaragua)
    // Cambia los ceros por el número real de Antojitos Cuevas
    const telefono = "50500000000"; 
    
    let mensaje = "¡Hola La cocina de Mary! 👋 Me gustaría hacer un pedido:%0A%0A";
    let total = 0;

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} - C$ ${item.precio}%0A`;
        total += item.precio;
    });

    mensaje += `%0A*Total a pagar: C$ ${total}*`;
    
    const url = `https://wa.me/${50557473538}?text=${mensaje}`;
    
    // Abre WhatsApp en una pestaña nueva
    window.open(url, '_blank');
}
