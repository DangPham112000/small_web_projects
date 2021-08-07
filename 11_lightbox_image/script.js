{/* 
<div class="lightbox">
    <div class="lightbox-content">
        <img src="https://images.unsplash.com/photo-1622495488220-9982960ff3e3?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80" alt="">
    </div>
</div> 
*/}

const imgs = document.querySelectorAll('.content img');

// click img then open light box
imgs.forEach((img, index) => {
    img.addEventListener('click', (e) => {
        const srcImg = e.target.getAttribute('src');

        const lightboxEl = `
            <div class="lightbox">
                <button class="control-btn lightbox-prev"><i class="fa fa-angle-left lightbox-prev"></i></button>
                <div class="lightbox-content">
                    <img src="${srcImg}" alt="">
                </div>
                <button class="control-btn lightbox-next"><i class="fa fa-angle-right lightbox-next"></i></button>
            </div>
        `;       

        document.body.insertAdjacentHTML('beforeend', lightboxEl);

        // handle hide button
        hideBtn(index);
    });
});

let index = 0;
document.body.addEventListener('click', (e) => {
    if (e.target.matches('.lightbox')) {
        // remove lightbox out of dom
        e.target.parentNode.removeChild(e.target);
    } else if (e.target.matches('.lightbox-prev')) {
        // handle prev img
        handleControlImg('prev');
    } else if (e.target.matches('.lightbox-next')) {
        // handle next img
        handleControlImg('next');
    }
})

function handleControlImg(control) {
    const lightboxImg = document.querySelector('.lightbox img');
    const lightboxImgSrc = lightboxImg.getAttribute('src');
    
    // get current index
    index = [...imgs].findIndex(img => img.getAttribute('src') === lightboxImgSrc);
    
    if (control === 'prev') {
        index--
    } else if (control === 'next') {
        index++;
    }

    if ([...imgs][index]) {
        const newSrc = [...imgs][index].getAttribute('src');
        lightboxImg.setAttribute('src', newSrc);
        hideBtn(index);
    }
}

function hideBtn(index) {
    const lightboxControlBtn = document.querySelectorAll('.lightbox .control-btn');
    if (index === 0) {
        lightboxControlBtn[0].setAttribute('style', 'opacity: 0.2');
    } else if (index === imgs.length - 1) {
        lightboxControlBtn[1].setAttribute('style', 'opacity: 0.2');
    } else {
        lightboxControlBtn[0].setAttribute('style', 'opacity: 1');
        lightboxControlBtn[1].setAttribute('style', 'opacity: 1');
    }
}