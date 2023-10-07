
function listener() {
  let url = window.location.href
  console.log(url)
  if (url !== "http://localhost:8080/cart") {
    socket.emit("length")
  }
  else if (url === "/cart" || url === "https://backend-ecommerce-r1ay.onrender.com/cart") {
    socket.emit("card")
    socket.emit("totalamount")
  }
}
listener()
socket.on("cartLength", (data) => {
  document.getElementById("carrito").innerHTML = data;
});

socket.on("card-cart", (data, cid) => {
  let location = document.getElementById("cart")
  location.innerHTML = ""
  data.forEach((data) => {
    let product = data.product
    let quantity = data.quantity
    productID = product._id.toString()
    let tr = document.createElement("tr")
    tr.classList.add("totalAmount")
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
    <td class="align-middle justify-content-center border-bottom-0">
      <button class="quantity" type="submit" onclick="subtractUnit('${product._id.toString()}', ${quantity},'${cid}')")>-</button>
        ${quantity}
      <button class="quantity" type="submit" onclick="addUnit('${product._id.toString()}', ${quantity}, '${cid}')">+</button>

    </td>
    <td class="align-middle border-bottom-0">
      <p class="mb-0" style="font-weight: 500;">${product.price}</p>
    </td>
    <td class="align-middle border-bottom-0">
    <button class="deleteButton" type="submit" data-product-id="${product._id.toString()}" onclick="getPID('${product._id.toString()}', '${cid}')"><img class="tachito" src="https://img.freepik.com/vector-premium/eliminar-icono-boton-rojo-ilustracion-simbolo-bote-basura_692379-615.jpg?w=2000"></button>
    </td> `
    location.appendChild(tr)
  })

})

socket.on("amount", (data, cid, mail) => {
  console.log(document.getElementsByClassName("totalAmount"))
  document.getElementById("amount").innerHTML = `     
  <table class="table">
  <thead>
    <tr>
      <th scope="col" class="h4">El precio total a pagar es de: ${data}</th>
    </tr>
  </thead>
  <tbody id="cart">
  </tbody>
</table> 
${data > 0 ? `<button onclick="purchaseOrder('${cid}', '${mail}')" class="btn btn-success"> Comprar </button>` : ''}
`

})
async function purchaseOrder(cid, mail) {
  let bodyP = { purchaser: mail }
  await fetch(`api/cart/${cid}/purchase`, {
    method: "POST", headers: {
      "Content-Type": "application/json"
    }, body: JSON.stringify(bodyP)
  }).then(response => response.json()).then(response => {
    if(response.success === true) {
      window.location.href = response.link
    }
    else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          width: "300px",
          heigth: "20px",
          title: 'One of the products not have stock, please try remove this',
          showConfirmButton: false,
          timer: 1500
        })
    }
  })
}
async function subtractUnit(id, quantity, cid) {
  let pid = id
  if (quantity > 1) {
    let newQuantity = quantity - 1
    await fetch(`api/cart/${cid}/products/${pid}/${newQuantity}/subtract`, {
      method: "PUT",
    })
  }
  else {
    alert("Ya tienes el minimo de unidades")
  }
  socket.emit("card")
  socket.emit("totalamount")
}
async function addUnit(id, quantity, cid) {
  let pid = id
  let newQuantity = quantity + 1
  if (pid && newQuantity) {
    await fetch(`api/cart/${cid}/products/${pid}/${newQuantity}/add`, {
      method: "PUT",
    }).then(response => response.json())
    .then(data => {
      if (data.success === false) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          width: "300px",
          heigth: "20px",
          title: 'You have reached the maximum stock',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  socket.emit("card")
  socket.emit("totalamount")
}
async function getPID(id, cid) {
  pid = id;
  await fetch(`/api/cart/${cid}/products/${pid}`, {
    method: 'DELETE',
  }).then(response => response.json())
    .then(data => {
      if (data.success === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          width: "300px",
          heigth: "20px",
          title: 'Product removed succesfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  socket.emit("card")
  socket.emit("totalamount")
};
