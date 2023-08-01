
function listener() {
    let url = window.location.href
    const regex = /\/products\/[^/]+/
    let newUrl = url.replace(regex, "/products");
    if (newUrl === "http://localhost:8080/products") {
        socket.emit("products")
        socket.emit("length")
    }
}
listener()


async function eventSubmit(id, cid) {
    let idNumber = id
    let quantity = document.getElementById("quantity").value
    let data = { quantity }
    let cart = cid
    await fetch(`/api/cart/${cart}/products/${idNumber}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product added succesfully',
                    width:"300px",
                    heigth:"20px",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else if(data.success === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    width:"300px",
                    heigth:"20px",
                    text: 'Product already in the cart',
                  })
            }
        })
        .catch(error => {
            console.error("Error al enviar la solicitud:", error);
        });
    socket.emit("new_stock", id)
    socket.emit("length")
    active()
}


socket.on("change_stock", product => {
    location.innerHTML = ""
    location.innerHTML = product.stock
})

/* socket.on("load_products", async data => {
    let location = document.getElementById("products")
    location.innerHTML = ""
    data.map((product) => {
        const card = document.createElement("div")
        card.className = "card col-md-4 my-5 mb-5 mx-5";
        card.style = "width: 18rem;";
        card.innerHTML = `
        <img src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <a href="/products/${product._id}" class="btn"style="background-color: #83b674; color: white;">Ver más información</a>
        </div>
        `
        location.appendChild(card)
    })
}) */

document.addEventListener("DOMContentLoaded", function (e) {
    active()
})

function active() {
    const currentPath = window.location.pathname;
    socket.emit("product-find", currentPath)
}

socket.on("detail-product", (product, cid)=> {
    let location = document.getElementById("detail")
    location.innerHTML = ` 
    <div class="card col-md-12 my-5 mb-5 mx-5" style="width: 18rem;">
        <img src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text"> ${product.description}   </p>
        <p class="card-text"><b>${product.price}$</b></p>
        <p id="stock" class="card-text">Stock: ${product.stock} </p>
        <input id="quantity" name="quantity" class="my-3" type="number" value="1" />
        <button id="boton" class="btn"  onclick="eventSubmit('${product._id.toString()}', '${cid}')" style="background-color: #83b674; color: white;" >Agregar al carrito</button>
    </div>
    `
})


