async function submitForgot() {
    const mail = document.getElementById('mailF').value;
    let body = { mail: mail }
    if (mail) {
        await fetch(`/api/auth/forgot-password`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Revisa tu correo electronico",
                    width: "300px",
                    heigth: "20px",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
}

function cambiarContraseña() {
    const newPassword = document.getElementById('npassword').value;
    const confirmPassword = document.getElementById('cpassword').value;
    if (newPassword === confirmPassword) {
        const data = {
            password: newPassword,
        };

        fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json()).then(response => {
                if (response.success === true) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Contraseña cambiada con exito',
                        width: "300px",
                        heigth: "20px",
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'El link ya ha expirado o las contraseñas no coinciden',
                        width: "300px",
                        heigth: "20px",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert('Las contraseñas no coinciden');
    }
}