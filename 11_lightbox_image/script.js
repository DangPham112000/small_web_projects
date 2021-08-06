{/* 
<div class="lightbox">
    <div class="lightbox-content">
        <img src="https://images.unsplash.com/photo-1622495488220-9982960ff3e3?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80" alt="">
    </div>
</div> 
*/}

const imgs = document.querySelectorAll('.content img');

// click img then open light box
imgs.forEach(img => {
    img.addEventListener('click', (e) => {
        const srcImg = e.target.getAttribute('src');

        const lightboxEl = `
            <div class="lightbox">
                <button><i class="fa fa-angle-left lightbox-prev"></i></button>
                <div class="lightbox-content">
                    <img src="${srcImg}" alt="">
                </div>
                <button><i class="fa fa-angle-right lightbox-next"></i></button>                    
            </div> 
        `;       

        document.body.insertAdjacentHTML('beforeend', lightboxEl);
    });
});

document.body.addEventListener('click', (e) => {
    if (e.target.matches('.lightbox')) {
        // remove lightbox out of dom
        e.target.parentNode.removeChild(e.target);
    }
})