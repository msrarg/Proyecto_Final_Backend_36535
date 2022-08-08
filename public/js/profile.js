const phoneInputField = document.querySelector("#telefono");
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ["ar"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});


const profileForm = document.getElementById('profileForm')
const profileImageForm = document.getElementById('profileImageForm')

const buttonFormContentCompleted = `Guardar`;
const buttonFormContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonFormContentCompleted}`;

const buttonImageContentCompleted = `Actualizar imagen`;
const buttonImageContentLoading = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${buttonImageContentCompleted}`;

const btnProfile = document.querySelector('#btnProfile');
const btnProfileImage = document.querySelector('#btnProfileImage');


profileForm.addEventListener('submit', function (e) {
    e.preventDefault();
    cleanErrors();
    let form_validation = true;

    if (!isRequired(document.getElementById('nombre').value)) {
        showError('nombre', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('email').value)){
        showError('email', 'Este es un campo requerido');
        form_validation = false;
    } else if (!isEmailValid(document.getElementById('email').value)) {
        showError('email', 'No es un email válido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('edad').value)) {
        showError('edad', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!phoneInput.getNumber()) {
        showError('telefono', 'Este es un campo requerido');
        form_validation = false;
    } else if (!phoneInput.isValidNumber()) {
        showError('telefono', 'No es un teléfono válido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('direccion').value)) {
        showError('direccion', 'Este es un campo requerido');
        form_validation = false;
    }

    if (form_validation){
        let formdata = new FormData(profileForm)
        let data = {
            nombre: formdata.get('nombre'),
            email: formdata.get('email'),
            direccion: formdata.get('direccion'),
            edad: formdata.get('edad'),
            telefono: phoneInput.getNumber(),
        }

        btnProfile.innerHTML = buttonFormContentLoading
        btnProfile.disabled = true;
        fetch('/api/usuarios/userUpdate', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(info => {
            btnProfile.innerHTML = buttonFormContentCompleted
            btnProfile.disabled = false;
            if (info.updated === true){
                renderToasty('success', 'Se han actualizado con éxito los cambios');
            } else {
                renderToasty('error', 'No se pudieron actualizar los campos. El correo electrónico ya está registrado.');
            }
        });
    }

});


profileImageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    cleanErrors();
    let form_validation = true;

    if (!isRequired(document.getElementById('profileImage').value)) {
        showError('profileImage', 'Este es un campo requerido');
        form_validation = false;
    }

    if (form_validation){
        btnProfileImage.innerHTML = buttonImageContentLoading
        btnProfileImage.disabled = true;
        let formData = new FormData(profileImageForm);

        return fetch('/api/usuarios/userImageUpload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(imageProfile => {
            btnProfileImage.innerHTML = buttonImageContentCompleted
            btnProfileImage.disabled = false;
            if (imageProfile.uploaded === true){
                renderToasty('success', 'Se actualizo la imagen');
                document.querySelector('#profileImageDisplay').src= imageProfile.imgUrl;
                document.querySelector('#menuImageDisplay').src= imageProfile.imgUrl;
            } else {
                renderToasty('error', 'No se pudo actualizar la imagen');
            }
        });
    }
});





