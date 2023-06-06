

document.addEventListener("DOMContentLoaded", function () {
  socket.emit("length")
  socket.emit("card")
});

socket.on("cartLength", (data) => {
  document.getElementById("carrito").innerHTML = data;
});

socket.on("card-cart", (data) => {
  let location = document.getElementById("cart")
  console.log
  location.innerHTML = ""
  data.forEach((product) => {
    let tr = document.createElement("tr")
    tr.innerHTML = `     
      <th scope="row" class="border-bottom-0">
        <div class="d-flex align-items-center">
        <img src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" class="img-fluid rounded-3"
          style="width: 120px;" alt="Book">
        <div class="flex-column ms-4">
          <p class="mb-2">${product.title}</p>
        </div>
      </div>
      </th>
    <td class="align-middle border-bottom-0">
      <p class="mb-0" style="font-weight: 500;">${product.description}</p>
    </td>
    <td class="align-middle border-bottom-0">
      <div class="d-flex flex-row">
      ${product.quantity}
        </button>
      </div>
    </td>
    <td class="align-middle border-bottom-0">
      <p class="mb-0" style="font-weight: 500;">${product.price}</p>
    </td>
    <td class="align-middle border-bottom-0">
    <button class="deleteButton" type="submit" data-product-id="${product.id}" onclick="getPID(${product.id})"><img class="tachito" src="https://img.freepik.com/vector-premium/eliminar-icono-boton-rojo-ilustracion-simbolo-bote-basura_692379-615.jpg?w=2000"></button>
    </td> `
    location.appendChild(tr)
  })

})

let pid = 1;

async function getPID(id) {
  pid = id;
      await fetch(`/api/cart/1/products/${pid}`, {
        method: 'DELETE',
      })
      socket.emit("card")
};