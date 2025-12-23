
// State
let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];
let quizSession = {
    completed: false,
    finalScore: 0
};

// Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const progressBar = document.getElementById('progress-bar');
const questionNumberEl = document.getElementById('question-number');
const scoreDisplay = document.getElementById('score-display');
const questionBox = document.getElementById('question-box');
const resultBox = document.getElementById('result-box');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Init
// Init
function initQuiz() {
    // Use the global variable from questions-data.js
    if (typeof quizQuestionsData === 'undefined') {
        questionText.textContent = "Error: quizQuestionsData not found. Please ensure js/questions-data.js is loaded.";
        return;
    }
    
    // Randomize questions
    currentQuestions = [...quizQuestionsData].sort(() => Math.random() - 0.5);
    
    currentQuestionIndex = 0;
    score = 0;
    
    // UI Reset
    questionBox.style.display = 'block';
    resultBox.style.display = 'none';
    progressBar.style.width = '0%';
    
    renderQuestion();
}

function renderQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    // Update Text
    questionText.textContent = question.text;
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}/${currentQuestions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;
    
    // Update Progress
    const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Clear previous
    optionsContainer.innerHTML = '';
    feedbackEl.style.display = 'none';
    feedbackEl.className = 'feedback';
    nextBtn.style.display = 'none';
    finishBtn.style.display = 'none';

    // Render Options
    question.options.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctIndex;
    
    // Disable all buttons
    const buttons = optionsContainer.children;
    for (let btn of buttons) {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.7';
    }

    // Highlight selected
    buttons[selectedIndex].style.opacity = '1';
    buttons[selectedIndex].classList.add('selected');

    // Show Feedback
    feedbackEl.style.display = 'block';
    if (isCorrect) {
        score++;
        feedbackEl.textContent = "✅ Correct! " + question.feedback;
        feedbackEl.classList.add('correct');
    } else {
        feedbackEl.textContent = "❌ Incorrect. " + question.feedback;
        feedbackEl.classList.add('incorrect');
    }

    scoreDisplay.textContent = `Score: ${score}`;

    // Show Next Button
    if (currentQuestionIndex < currentQuestions.length - 1) {
        nextBtn.style.display = 'inline-block';
    } else {
        finishBtn.style.display = 'inline-block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    renderQuestion();
}

function finishQuiz() {
    questionBox.style.display = 'none';
    resultBox.style.display = 'block';
    progressBar.style.width = '100%';
    
    const percentage = Math.round((score / currentQuestions.length) * 100);
    finalScoreEl.textContent = `${percentage}%`;
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
finishBtn.addEventListener('click', finishQuiz);
restartBtn.addEventListener('click', initQuiz);

// Start
initQuiz();
