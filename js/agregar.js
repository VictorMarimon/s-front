const API = "http://localhost:5005/app/productos";

const peticion = async (url, opciones) => {
  const respuesta = await fetch(url, opciones);
  if (respuesta.ok) {
    const datos = await respuesta.json();
    return datos;
  }
  return [];
};

const agregar = document.getElementById("btn-agregar");

agregar.addEventListener("click", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const cantidad = document.getElementById("cantidad").value;

  await peticion(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
    }),
  })
    .then(() => {
      alert(`¡Producto ${nombre} agregado!`);
    })
    .catch((res) => {
      alert("Error al agregar el producto.");
    });

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("cantidad").value = "";
});
