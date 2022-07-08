const sendForm = ({ formId, someElem = [] }) => {
    const form = document.getElementById(formId);
    const statusBlock = document.createElement('div');
    const errorText = 'Ошибка...';
    const successText = 'Спасибо! Наш менеджер с вами свяжется!';

    let errorMesage;

    const validate = (list) => {
        let success = true;

        list.forEach(input => {
            if (success == false) {
                return;
            }
            if (input.name == 'user_name') {
                let nameCheck = /[а-яё\s]+/gi;
                nameCheck.test(input.value) ? success = true : success = false;
            } else if (input.name == 'user_phone') {
                let numCheck = /[0-9\-\(\)\+]/gi;
                numCheck.test(input.value) && input.value.length >= 11 ? success = true : success = false;
                errorMesage = 'Введите корректный номер телефона';
            } else if (input.name == 'user_message') {
                let nameCheck = /[а-яё\s\d\!\?\.\,]+/gi;
                nameCheck.test(input.value) ? success = true : success = false;
            }
        });

        return success;
    };

    const sendData = (data) => {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
    };

    const submitForm = () => {
        const formElements = form.querySelectorAll('input');
        const formData = new FormData(form);
        const formBody = {};
       
        form.append(statusBlock);

        formData.forEach((val, key) => {
            formBody[key] = val;
        });

        someElem.forEach(elem => {
            const element = document.getElementById(elem.id);

            if (elem.type === 'block') {
                formBody[elem.id] = element.textContent;
            } else if (elem.type === 'input') {
                formBody[elem.id] = element.value;
            }
        });

        if (validate(formElements)) {
            sendData(formBody)
                .then(data => {
                 
                    statusBlock.textContent = successText;

                    setTimeout(() => {
                        statusBlock.textContent = '';
                    }, 3000);

                    formElements.forEach(input => {
                        input.value = '';
                    });
                })
                .catch(error => {                   
                    statusBlock.textContent = errorText;

                    setTimeout(() => {
                        statusBlock.textContent = '';
                    }, 3000);
                });

        } else {
            statusBlock.style.cssText = '';
            alert(errorMesage);
        }
    };

    try {
        if (!form) {
            throw new Error('Верните форму на место, пожалуйста)');
        }
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            submitForm();

        });
    } catch (error) {
        console.log(error.message);
    }

};

export default sendForm;
