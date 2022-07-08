const inputCheck = () => {

    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');

    const mainInput = document.querySelectorAll('.form-name')[0];
    const modalInput = document.querySelectorAll('.form-name')[1];
    const footerInput = document.getElementById('form2-name');
    const messageInput = document.getElementById('form2-message');

    const emailInputs = document.querySelectorAll('.form-email');

    const phoneInputs = document.querySelectorAll('.form-phone');

    const numberCheck = (input) => {
        input.addEventListener('blur', (e) => {
            e.target.value = e.target.value.replace(/\D+/, '');
        });
    };

    const textCheck = (input) => {
        input.addEventListener('blur', (e) => {
            let word = e.target.value.replace(/[^а-яё\-\s+]/gi, ' ');
            word = word.replace(/^\s+|\s+$/g, '');
            word = word.replace(/^\-+|\-+$/g, '');
            word = word.replace(/\s+/g, ' ');
            word = word.replace(/\-+/g, '-');

            e.target.value = word;
            if (word != '') {
                e.target.value = input.value = input.value.replace(/( |^)[а-яёa-z]/g, (w) => { return w.toUpperCase(); });
            }
        });


    };

    const mailCheck = (input) => {
        input.forEach((e) => {
            e.addEventListener('blur', () => {
                let word = e.value.replace(/[^a-z\@\-\_\.\!\~\*\'\d]/i, '');
                word = word.replace(/^\-+|\-+$/g, '');
                word = word.replace(/\-+/g, '-');

                e.value = word;
            });
        });
    };

    const phoneCheck = (input) => {
        input.forEach((e) => {
            e.addEventListener('blur', () => {
                let word = e.value.replace(/[^0-9\-\(\)\+]/gi, '');
                word = word.replace(/^\-+|\-+$/g, '');
                word = word.replace(/\-+/g, '-');

                e.value = word;
            });
        });
    };

    const emailRequired = (emails) => {
        emails.forEach((e) => {
            e.setAttribute("required", "");
        });
    };

    numberCheck(calcSquare);
    numberCheck(calcCount);
    numberCheck(calcDay);

    textCheck(mainInput);
    textCheck(modalInput);
    textCheck(footerInput);
    textCheck(messageInput);

    emailRequired(emailInputs);
    mailCheck(emailInputs);

    phoneCheck(phoneInputs);
};

export default inputCheck;