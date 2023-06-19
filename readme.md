

<h1><b>CAMBIOS REALIZADOS EN EL ULTIMO COMMIT:</b></h1>
<h2> WEBSOCKET ACTIVO</h2>
<h2> IMPLEMENTACION MONGODB Y MONGOOSE</h2>
<h2> POPULATES & INDEX</h2>
<ul>
Rutas views
<li>localhost:8080/products - <b>obtienes lista de productos</b></li>
<li>localhost:8080/products/:pid - <b>obtiene detalles del producto indicado </b></li>
<li>localhost:8080/chat - <b>ingresas al chat</b></li>
<li>localhost:8080/cart - <b>ingresas al carrito</b></li>
<li>localhost:8080/new_product - <b>formulario de creación de producto</b></li>
</ul>
<ul>
Rutas api
<li>METHOD GET: localhost:8080/api/cart - <b>obtiene todos los carritos</b></li>
<li>METHOD POST: localhost:8080/api/cart - <b>Crea un carrito</b></li>
<li>METHOD GET: localhost:8080/api/cart/:cid - <b>obtiene los datos del carrito indicado</b></li>
<li>METHOD PUT: localhost:8080/api/:cid/products/:pid - <b>añade un producto al carrito, necesita el ID del carrito, ID del producto y en el BODY la propiedad quantity</b></li>
<li>METHOD DELETE: localhost:8080//:cid/products/:pid - <b>similar al anterior, pero elimina el producto del carrito, no necesita la quantity en body.</b></li>
<li>METHOD GET: localhost:8080/api/products - <b>obtiene productos</b></li>
<li>METHOD GET: localhost:8080/api/products/:pid - <b>obtiene el objeto con el id indicado</b></li>
<li>METHOD POST: localhost:8080/api/products/post - <b>aquí es donde se envian los datos del formulario para crear el producto</b></li>
<li>METHOD PUT: localhost:8080/api/products/:pid - <b>se actualiza un producto desde esta ruta</b></li>
<li>METHOD DELETE: localhost:8080/api/products/:pid - <b>se elimina el producto indicado</b></li>
</ul>
