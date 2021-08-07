const controlContainerBtns = document.querySelectorAll('.control-container-btn');
const containerImg = document.querySelector('.img-cards');
const imgCardEls = [...document.querySelectorAll('.container .img-card')];
const numberTranslate = 290;
const imgWidth = 290;
const containerWidth = (imgCardEls.length) ? imgWidth * imgCardEls.length : 0;
let totalMove = 0;
let currentIndex = 0;


document.querySelector('.control-container-btn.prev-btn').addEventListener('click', () => {
    handleContainerControl('prev');
});

document.querySelector('.control-container-btn.next-btn').addEventListener('click', () => {
    handleContainerControl('next');
});

function handleContainerControl(control) {
    if (control === 'next') {
        totalMove-=numberTranslate;
    } else if (control === 'prev') {
        totalMove+=numberTranslate;
    }

    if (totalMove > 0)
    {
        totalMove = 0;
    } else if (totalMove < -containerWidth+window.innerWidth) {
        totalMove = -containerWidth+window.innerWidth;
    }
    console.log(-containerWidth);
    console.log(-window.innerWidth);
    containerImg.setAttribute('style', `transform: translateX(${totalMove}px);`);
}

// template
/**
 * <div class="modal">
        <button class="control-modal-btn prev-btn"><i class="fa fa-angle-left"></i></button>
        <div class="img-card">
            <img src="https://images.unsplash.com/photo-1628285477029-e98c852cfb63?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixdivb=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="">
        </div>
        <button class="control-modal-btn next-btn"><i class="fa fa-angle-right"></i></button>        
    </div>
 */

// open modal when click img-card
imgCardEls.forEach(imgCardEl => {
    imgCardEl.addEventListener('click', () => {
        const modalEl = document.createElement('div');
        const imgUrl = imgCardEl.querySelector('img').getAttribute('src');

        modalEl.classList.add('modal');

        modalEl.innerHTML = `
            <button class="control-modal-btn close-btn"><i class="fa fa-times"></i></button>
            <button class="control-modal-btn prev-btn"><i class="fa fa-angle-left"></i></button>
            <div class="img-card">
                <img src="${imgUrl}" alt="">
            </div>
            <button class="control-modal-btn next-btn"><i class="fa fa-angle-right"></i></button>  
        `;

        // handle button
        const prevBtn = modalEl.querySelector('.control-modal-btn.prev-btn');
        const nextBtn = modalEl.querySelector('.control-modal-btn.next-btn');
        const closeBtn = modalEl.querySelector('.control-modal-btn.close-btn');
        prevBtn.addEventListener('click', () => {
            handleModalControl('prev');
        });
        nextBtn.addEventListener('click', () => {
            handleModalControl('next');
        });
        closeBtn.addEventListener('click', () => {
            handleModalControl('close');
        });

        document.body.appendChild(modalEl);


    });
});

function handleModalControl(control) {
    // get currentIndex
    const modalImg = document.querySelector('.modal img');
    currentIndex = imgCardEls.findIndex(imgCardEl => imgCardEl.querySelector('img').getAttribute('src') === modalImg.getAttribute('src'));
    if (control === 'prev') {
        currentIndex--;
    } else if (control === 'next') {
        currentIndex++;
    } else if (control === 'close') {
        document.body.removeChild(document.querySelector('.modal'));
        return;
    }

    if (imgCardEls[currentIndex]) {
        const url = imgCardEls[currentIndex].querySelector('img').getAttribute('src');
        modalImg.setAttribute('src', url);
    }
}

document.body.addEventListener('click', (e) => {
    if (e.target.matches('.modal')) {
        e.target.parentNode.removeChild(e.target);
    }
});

