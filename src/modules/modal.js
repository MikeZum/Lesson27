import { animate } from './helpers';

const modal = () => {
    const modal = document.querySelector('.popup');
    const buttons = document.querySelectorAll('.popup-btn');
    const modalWindow = modal.querySelector('.popup-content');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (document.body.clientWidth > 768) {
                modal.style.display = 'block';
                animate({
                    duration: 1000,
                    timing(timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        modalWindow.style.left = (50 * progress) + "%";
                        modalWindow.style.transform = `translate(-50%)`;
                    }
                });
            } else {
                modal.style.display = 'block';
            }
        });
    });

    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.popup-content') || e.target.classList.contains('popup-close')) {
            modalWindow.style.left = '0px';
            modal.style.display = 'none';
        }
    });
};

export default modal;