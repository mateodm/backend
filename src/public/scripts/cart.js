

document.addEventListener("DOMContentLoaded", function () {
  socket.emit("length")
  socket.emit("card")
});

socket.on("cartLength", (data) => {
  document.getElementById("carrito").innerHTML = data;
});

socket.on("card-cart", (data) => {
  let location = document.getElementById("cart")
  location.innerHTML = ""
  data.forEach((data) => {
  let product = data.product
  let quantity = data.quantity
  productID = product._id.toString()
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
      ${quantity}
        </button>
      </div>
    </td>
    <td class="align-middle border-bottom-0">
      <p class="mb-0" style="font-weight: 500;">${product.price}</p>
    </td>
    <td class="align-middle border-bottom-0">
    <button class="deleteButton" type="submit" data-product-id="${product._id.toString()}" onclick="getPID('${product._id.toString()}')""><img class="tachito" src="https://img.freepik.com/vector-premium/eliminar-icono-boton-rojo-ilustracion-simbolo-bote-basura_692379-615.jpg?w=2000"></button>
    </td> `
    location.appendChild(tr)
  })

})



async function getPID(id) {
  pid = id;
      await fetch(`/api/cart/6490cf8ae17a7f96df15d3f4/products/${pid}`, {
        method: 'DELETE',
      })
      socket.emit("card")
};