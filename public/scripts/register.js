
function submitRegister(event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const mail = document.getElementById('mail').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const lastname = document.getElementById("lastname").value;

    const formData = {
      first_name: name,
      last_name: lastname,
      mail: mail,
      age: age,
      password: password,
      photo: "img.jpg",
    };
    fetch('/api/auth/register', {
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
            title: 'Has been registered succesfully',
            showConfirmButton: false,
            timer: 2500
          })
          window.location.href = '/signin'
        } 
        else if(data.success === false) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            width:"300px",
            heigth:"20px",
            text: 'Email already exists or params missings',
          })
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
      });
  }
