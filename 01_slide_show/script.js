const IMG_WIDTH = 400;
const slideContainer = $('.slides');
const slides = [...$$('.slide')];

slideContainer.style.width = (slides.length) ? `${slides.length * IMG_WIDTH}px` : 0;

let index = 0;

function next() {
    if (index < slides.length - 1) {
        index++;
    } else {
        index = 0;
    }
    slideContainer.style.transform = `translateX(-${IMG_WIDTH*index}px)`
}

const nextBtn = $('#next');
nextBtn.addEventListener('click', () => {
    next();
});

function prev() {
    if (index > 0) {
        index--;
    } else {
        index = slides.length - 1;
    }
    slideContainer.style.transform = `translateX(-${IMG_WIDTH*index}px)`
}

const prevBtn = $('#prev');
prevBtn.addEventListener('click', () => {
    prev();
});


setInterval(() => {
    next();
}, 3000);