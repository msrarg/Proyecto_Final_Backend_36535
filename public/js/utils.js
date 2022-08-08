const isRequired = value => value === '' ? false : true;

const showError = (input_id, message) => {
    const input = document.querySelector(`#${input_id}`);
    input.classList.add('is-invalid');
    const error = input.closest('.form-group').querySelector('.invalid-feedback');
    error.textContent = message;
    error.style.display = 'block';
};

const cleanErrors = () => {
    const elements = document.querySelectorAll(".form-control, .form-select");
    elements.forEach( (element) => {
        element.classList.remove('is-invalid');
    });
    //Esto se agrego para los del tipo tel
    const alerts = document.querySelectorAll(".invalid-feedback");
    alerts.forEach((al) => {
        al.style.display = 'none';
    });
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const renderToasty = (tipo,texto,gravity='top',position='right') => {
    let background = '';
    if (tipo === 'success'){
        background = '#00b09b, #96c93d';
    }
    if (tipo === 'error'){
      background = '#ff5f6d, #ffc371';
    }
 
    Toastify({
        text: texto,
        duration: 3000,
        gravity,
        position,
        style: {
            background: `linear-gradient(to right, ${background})`
          }
      }).showToast();
}

const formatDecimal = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

