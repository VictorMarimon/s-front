const API = "http://localhost:5005/app/productos";

const tablaPrincipal = document.getElementById("t-principal");
const formularioEditar = document.getElementById("formulario-editar");
const btnEditar = document.getElementById("btn-editar");

const contenidoTabla = document.createElement("tbody");

const peticion = async (url, opciontes) => {
  const respuesta = await fetch(url, opciontes);
  if (respuesta.ok) {
    const datos = await respuesta.json();
    return datos;
  }
  return [];
};

document.addEventListener("DOMContentLoaded", async (e) => {
  await peticion(API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((datos) => {
    datos.map((dato) => {
      contenidoTabla.innerHTML += `
                <tr>
                    <th scope="row" key="${dato.id}">${dato.id}</th>
                    <td>${dato.nombre}</td>
                    <td>$${dato.precio}</td>
                    <td>${dato.cantidad}</td>
                    <td>
                        <a href="../html/actualizar.html" class="btn btn-warning btn-actualizar" data-bs-toggle="modal" data-bs-target="#modalEditar" data-id="${dato.id}" onclick="obtenerProducto(${dato.id})">Editar</a>
                        <a href="./index.html" class="btn btn-danger btn-eliminar" data-id="${dato.id}" onclick="eliminarProducto(${dato.id})">Eliminar</a>
                    </td>
                </tr>
            `;
    });
  });

  tablaPrincipal.appendChild(contenidoTabla);
});

btnEditar.addEventListener("click", async (e) => {
  e.preventDefault();

  const id = sessionStorage.getItem("productoId");

  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const cantidad = document.getElementById("cantidad").value;

  await editarProducto(id, nombre, precio, cantidad);
});

async function eliminarProducto(id) {
  await peticion(`${API}/${id}`, {
    method: "DELETE",
  });
}

async function obtenerProducto(id) {
  await peticion(`${API}/${id}`, {
    method: "GET",
  })
    .then((producto) => {
      sessionStorage.setItem("productoId", id);
      document.getElementById("nombre").value = producto.nombre;
      document.getElementById("precio").value = producto.precio;
      document.getElementById("cantidad").value = producto.cantidad;
    })
    .catch(( ) => {
      alert("Hubo un error");
    });
}

async function editarProducto(id, nombre, precio, cantidad) {
  await peticion(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      precio,
      cantidad,
    }),
  })
    .then(( ) => { 
      alert(`¡Producto ${nombre} editado!`);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}