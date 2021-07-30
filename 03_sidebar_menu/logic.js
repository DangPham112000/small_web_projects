const items = document.querySelectorAll('.item');
const toggle = document.querySelector('.toggle');
const navi = document.querySelector('.navigation');

items.forEach((item) => {
    // item.onclick = function() {
    //     const itemActive = document.querySelector('.active');
    //     item.classList.add('active');
    // }
    item.addEventListener('click', () => {
        const itemActive = document.querySelector('.item.active');
        if (itemActive) {
            itemActive.classList.remove('active');
        }
        item.classList.add('active');
    })
})

toggle.onclick = function() {
    this.classList.toggle('active');
    navi.classList.toggle('active');
}