const items = document.querySelectorAll('.item');

items.forEach((item) => {
    item.addEventListener('click', () => {
        const itemActive = document.querySelector('.item.active');
        if (itemActive) {
            itemActive.classList.remove('active');
        }
        item.classList.add('active');
    })
})