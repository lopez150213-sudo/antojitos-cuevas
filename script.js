const titulo = document.getElementById("titulo-principal");
const colores = ["orange","yellow", "green", "blue", "red"];
let indice = 0;

// Esta función se encarga de cambiar el color
function cambiarColorAutomatico() {
    titulo.style.color = colores[indice];
    
    indice++; // Aumentamos el índice

    // Si llegamos al final de la lista, reiniciamos a 0
    if (indice >= colores.length) {
        indice = 0;
    }
}

// setInterval recibe dos cosas: la función a ejecutar y el tiempo en milisegundos
// 1000 milisegundos = 1 segundo
setInterval(cambiarColorAutomatico, 1000);