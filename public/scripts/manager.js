async function deleteProduct(id) {
    await fetch(`/api/products/${id}`, {
        method: "DELETE", headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).then(response => {
        if (response.success === false) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                width: "300px",
                heigth: "20px",
                title: 'Not authorized to delete this',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else { 
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
}
