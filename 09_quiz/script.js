const quizs = [
    {
        question: 'What is my name ?',
        a: 'Pham Hai Dang',
        b: 'Phan Khac Thanh Danh',
        c: 'Tran Quoc Thinh',
        d: 'Pham Hoang Viet',
        correct: 'a'
    }, {
        question: 'Who is the President of VN ?',
        a: 'Truong Tan Sang',
        b: 'Nguyen Phu Trong',
        c: 'Nguyen Minh Triet',
        d: 'Nguyen Xuan Phuc',
        correct: 'd'
    }, {
        question: 'What does HTML stand for ?',
        a: 'Cascading Style Sheet',
        b: 'Hypertext Markup Language',
        c: 'Jason Object Notation',
        d: 'Helicopter Terminal Modeling Language',
        correct: 'b'
    }, {
        question: 'What year was JavaScript launched ?',
        a: '2020',
        b: '2021',
        c: '2022',
        d: 'none of above',
        correct: 'd'
    }
];
const quizContainerEl = document.querySelector('.quiz-container');
const answerEls = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
    const currentQuizData = quizs[currentQuiz];
    questionElement.innerText = `${currentQuiz + 1}. ${currentQuizData.question}`;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    resetChecked();
}

function resetChecked() {
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answerEl.checked = false;
        }
    });
}

const getSelected = function() {

    let answer = undefined;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

loadQuiz();



submitBtn.addEventListener('click', () => {
    if (getSelected() === quizs[currentQuiz].correct) {
        score+=1000;
    }

    if (++currentQuiz === quizs.length) {
        currentQuiz = 0;
        quizContainerEl.innerHTML = `
            <h2 class="top-container">Your score ${score} / ${quizs.length * 1000}! Get yourseft a Lemon</h2>
            <div class="bottom-container">
                <button onClick="location.reload()">Restart</button>
            </div>
        `;
    }
    
    loadQuiz();
});