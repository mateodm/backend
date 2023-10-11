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

async function deleteUser(id) {
    await fetch(`api/auth/delete-user/${id}`, {
    method: "DELETE", headers: {
        "Content-Type": "application/json"
    }
    }).then(response => response.json()).then(response => {
        if(response.success === true ) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                width: "300px",
                heigth: "20px",
                title: 'User removed succesfully',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

async function updateRole(id) {
    const role = document.getElementById(`roleSelect-${id}`).value
    console.log(role)
    let data = {role}
    await fetch(`api/auth/change-role/${id}`, {
        method: "PUT", headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(response => {
        if(response.success === true) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                width: "300px",
                heigth: "20px",
                title: 'Role changed succesfully',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}