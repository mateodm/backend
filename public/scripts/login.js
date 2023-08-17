
function submitLogin(event) {
    event.preventDefault(); 
    const mail = document.getElementById('mail-login').value;
    const password = document.getElementById('password-login').value;

    const formData = {
        mail: mail,
        password: password
    };
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === true) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            width:"300px",
            heigth:"20px",
            title: 'Has been login succesfully',
            showConfirmButton: false,
            timer: 2500
          })
          window.location.href = '/products'
          console.log(data.cookie)
        } 
        else if(data.success === false) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            width:"300px",
            heigth:"20px",
            text: 'Email not exists or incorrect password',
          })
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
      });
  }



  
