const canvasEl = document.getElementById('canvas');
const ctx = canvasEl.getContext("2d");
const pointEl = document.getElementById('point');
const ctxPoint = pointEl.getContext("2d");
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const colorEl = document.getElementById('color');
const eraserEl = document.getElementById('eraser');
const clearEl = document.getElementById('clear');


let size = 5;
let isPressed;
let color = '#000';
let tmpcolor = '#000';
let x = undefined;
let y = undefined;

canvasEl.addEventListener('mousedown', (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvasEl.addEventListener('mouseup', (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvasEl.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
    
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function drawPoint() {
    ctxPoint.clearRect(0, 0, pointEl.width, pointEl.height);
    ctxPoint.beginPath();
    ctxPoint.arc(27, 27, size, 0, Math.PI * 2);
    ctxPoint.fill();
}

increaseBtn.addEventListener('click', () => {
    if (size < 25) {
        size += 5;
        drawPoint();
    }
});

decreaseBtn.addEventListener('click', () => {
    if (size > 5) {
        size -= 5;
        drawPoint();
    } else if (size > 1) {
        size--;
        drawPoint();
    }
});

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});

eraserEl.addEventListener('click', (e) => {
    if (color == '#fff') {
        color = tmpcolor;
    } else {
        tmpcolor = color;
        color = '#fff';
    }
});

clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
});


drawPoint();