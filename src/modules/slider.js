const slider = (slider, sliderItem, dotsParent) => {

    const sliderWrap = () => {
        const sliderBlock = document.querySelector(slider);
        const slides = document.querySelectorAll(sliderItem);
        const dotsBlock = document.querySelector(dotsParent);
        const timeInterval = 2000;

        let dots;
        let currentSlide = 0;
        let interval;

        const addDots = () => {
            slides.forEach(() => {
                dotsBlock.insertAdjacentHTML('beforeend',
                    `<li class='dot'></li>`);
            });
            dots = document.querySelectorAll('.dot');
            dots[0].classList.add('dot-active');
        };

        const prevSlide = (elems, index, strClass) => {
            elems[index].classList.remove(strClass);
        };

        const nextSlide = (elems, index, strClass) => {
            elems[index].classList.add(strClass);
        };

        const autoSlide = () => {
            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide = (timer = 1500) => {
            interval = setInterval(autoSlide, timer);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        sliderBlock.addEventListener('click', (e) => {
            e.preventDefault();

            if (!e.target.matches('.dot, .portfolio-btn')) {
                return;
            }

            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if (e.target.matches('#arrow-right')) {
                currentSlide++;
            } else if (e.target.matches('#arrow-left')) {
                currentSlide--;
            } else if (e.target.classList.contains('dot')) {
                dots.forEach((dot, index) => {
                    if (e.target === dot) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });

        sliderBlock.addEventListener('mouseenter', (e) => {
            if (e.target.matches('.dot, .portfolio-btn')) {
                stopSlide();
            }
        }, true);

        sliderBlock.addEventListener('mouseleave', (e) => {
            if (e.target.matches('.dot, .portfolio-btn')) {
                startSlide(timeInterval);
            }
        }, true);

        addDots();
        startSlide(timeInterval);
    };

    const sliderElems = [slider, sliderItem, dotsParent];

    const sliderCheck = () => {
        let count = 0;
        sliderElems.forEach((item) => {
            if (!document.querySelector(item)) {
                return;
            } else if (document.querySelector(item)) {
                count++;
            }
            if (count == 3) {
                sliderWrap();
            }
        });
    };

    sliderCheck();

};

export default slider;