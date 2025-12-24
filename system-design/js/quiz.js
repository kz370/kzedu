
// State
let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];
let wrongAnswers = []; // Track wrong answers for review
let selectedChapter = 'all'; // Track selected chapter
let quizSession = {
    completed: false,
    finalScore: 0
};

// Elements
const setupBox = document.getElementById('setup-box');
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
const wrongAnswersContainer = document.getElementById('wrong-answers-container');
const skipBtn = document.getElementById('skip-btn');
const dontKnowBtn = document.getElementById('dont-know-btn');

// Setup Elements
const questionCountInput = document.getElementById('question-count-input');
const setAllBtn = document.getElementById('set-all-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');
const totalQuestionsCount = document.getElementById('total-questions-count');
const chapterCardsContainer = document.getElementById('chapter-cards');

// Initialize Chapter Cards
function initChapterCards() {
    if (!chapterCardsContainer || typeof quizChapters === 'undefined') return;
    
    // Clear existing cards
    chapterCardsContainer.innerHTML = '';
    
    // Create chapter cards
    quizChapters.forEach(chapter => {
        const questionCount = getQuestionsByChapter(chapter.id).length;
        const card = document.createElement('div');
        card.className = 'chapter-card' + (chapter.id === selectedChapter ? ' selected' : '');
        card.dataset.chapterId = chapter.id;
        
        card.innerHTML = `
            <div class="chapter-card-icon">${chapter.icon || '📚'}</div>
            <div class="chapter-card-name">${chapter.shortName || chapter.name}</div>
            <div class="chapter-card-count">${questionCount} questions</div>
        `;
        
        card.addEventListener('click', () => selectChapter(chapter.id));
        chapterCardsContainer.appendChild(card);
    });
}

// Select a chapter
function selectChapter(chapterId) {
    selectedChapter = chapterId;
    
    // Update card visuals
    const cards = chapterCardsContainer.querySelectorAll('.chapter-card');
    cards.forEach(card => {
        card.classList.toggle('selected', card.dataset.chapterId === chapterId);
    });
    
    // Update question count
    updateQuestionCount();
}

// Update available question count based on selected chapter
function updateQuestionCount() {
    if (typeof quizQuestionsData === 'undefined') return;
    
    const availableQuestions = getQuestionsByChapter(selectedChapter);
    const totalQuestions = availableQuestions.length;
    
    // Update UI
    if (totalQuestionsCount) {
        totalQuestionsCount.textContent = totalQuestions;
    }
    if (questionCountInput) {
        questionCountInput.max = totalQuestions;
        // Adjust value if it exceeds the new max
        if (parseInt(questionCountInput.value) > totalQuestions) {
            questionCountInput.value = totalQuestions;
        }
        // Set a reasonable default
        if (parseInt(questionCountInput.value) < 1) {
            questionCountInput.value = Math.min(10, totalQuestions);
        }
    }
}

// Initialize Setup Screen
function initSetup() {
    // Check if quizQuestionsData is loaded
    if (typeof quizQuestionsData === 'undefined') {
        if (setupBox) setupBox.innerHTML = '<p style="color: red;">Error: Quiz data not found.</p>';
        return;
    }
    
    // Reset chapter selection
    selectedChapter = 'all';
    
    // Initialize chapter cards
    initChapterCards();
    
    const totalQuestions = quizQuestionsData.length;
    
    // Update UI with total questions available
    if (totalQuestionsCount) {
        totalQuestionsCount.textContent = totalQuestions;
    }
    if (questionCountInput) {
        questionCountInput.max = totalQuestions;
        questionCountInput.value = Math.min(10, totalQuestions); // Default to 10 or max available
    }
    
    // Show setup, hide others
    if (setupBox) setupBox.style.display = 'block';
    if (questionBox) questionBox.style.display = 'none';
    if (resultBox) resultBox.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';
}

// Start Quiz with selected chapter and number of questions
function startQuiz() {
    if (typeof quizQuestionsData === 'undefined') {
        alert('Error: Quiz data not loaded.');
        return;
    }
    
    // Get questions for selected chapter
    const chapterQuestions = getQuestionsByChapter(selectedChapter);
    
    if (chapterQuestions.length === 0) {
        alert('No questions available for the selected chapter.');
        return;
    }
    
    let questionCount = parseInt(questionCountInput.value) || 10;
    const totalQuestions = chapterQuestions.length;
    
    // Validate input
    if (questionCount < 1) questionCount = 1;
    if (questionCount > totalQuestions) questionCount = totalQuestions;
    
    // Randomize and slice questions
    const shuffled = [...chapterQuestions].sort(() => Math.random() - 0.5);
    currentQuestions = shuffled.slice(0, questionCount);
    
    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    wrongAnswers = [];
    
    // Switch UI from setup to quiz
    if (setupBox) setupBox.style.display = 'none';
    if (questionBox) questionBox.style.display = 'block';
    if (resultBox) resultBox.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';
    
    renderQuestion();
}

// Set All Questions (for selected chapter)
function setAllQuestions() {
    const chapterQuestions = getQuestionsByChapter(selectedChapter);
    if (questionCountInput) {
        questionCountInput.value = chapterQuestions.length;
    }
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
    
    // Show skip/don't know buttons, hide next/finish
    if (skipBtn) skipBtn.style.display = 'inline-block';
    if (dontKnowBtn) dontKnowBtn.style.display = 'inline-block';
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
        // Track wrong answer for review
        wrongAnswers.push({
            question: question.text,
            userAnswer: question.options[selectedIndex],
            correctAnswer: question.options[question.correctIndex],
            feedback: question.feedback
        });
    }

    scoreDisplay.textContent = `Score: ${score}`;
    
    // Hide skip/don't know buttons after answering
    if (skipBtn) skipBtn.style.display = 'none';
    if (dontKnowBtn) dontKnowBtn.style.display = 'none';

    // Show Next Button
    if (currentQuestionIndex < currentQuestions.length - 1) {
        nextBtn.style.display = 'inline-block';
    } else {
        finishBtn.style.display = 'inline-block';
    }
}

// Skip question - moves question to the END of the queue for later
function skipQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    // Remove the question from current position
    currentQuestions.splice(currentQuestionIndex, 1);
    
    // Add it to the end of the array
    currentQuestions.push(question);
    
    // Don't increment index since we removed the current question
    // The next question is now at the same index
    
    // Render the "new" current question (which was the next one)
    renderQuestion();
}

// Don't Know - shows correct answer, then moves on
function dontKnow() {
    const question = currentQuestions[currentQuestionIndex];
    
    // Disable all option buttons
    const buttons = optionsContainer.children;
    for (let btn of buttons) {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.7';
    }
    
    // Highlight the correct answer
    buttons[question.correctIndex].style.opacity = '1';
    buttons[question.correctIndex].classList.add('correct-highlight');
    
    // Show Feedback
    feedbackEl.style.display = 'block';
    feedbackEl.textContent = "🤔 The correct answer is shown above. " + question.feedback;
    feedbackEl.classList.add('dont-know');
    
    // Track for review
    wrongAnswers.push({
        question: question.text,
        userAnswer: "❓ Didn't know",
        correctAnswer: question.options[question.correctIndex],
        feedback: question.feedback,
        dontKnow: true
    });
    
    // Hide skip/don't know buttons
    if (skipBtn) skipBtn.style.display = 'none';
    if (dontKnowBtn) dontKnowBtn.style.display = 'none';
    
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
    
    // Display wrong answers for review
    renderWrongAnswers();
}

function renderWrongAnswers() {
    if (!wrongAnswersContainer) return;
    
    if (wrongAnswers.length === 0) {
        wrongAnswersContainer.innerHTML = `
            <div class="perfect-score">
                <span class="perfect-icon">🎉</span>
                <p>Perfect Score! You got all questions correct!</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="wrong-answers-header">
            <h3>📚 Questions to Review (${wrongAnswers.length})</h3>
            <p class="wrong-answers-subtitle">Study these questions to improve your knowledge</p>
        </div>
        <div class="wrong-answers-list">
    `;
    
    wrongAnswers.forEach((item, index) => {
        html += `
            <div class="wrong-answer-item fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="wrong-answer-question">
                    <span class="question-number-badge">${index + 1}</span>
                    ${item.question}
                </div>
                <div class="answer-comparison">
                    <div class="your-answer">
                        <span class="answer-label">❌ Your Answer:</span>
                        <span class="answer-text wrong">${item.userAnswer}</span>
                    </div>
                    <div class="correct-answer">
                        <span class="answer-label">✅ Correct Answer:</span>
                        <span class="answer-text correct">${item.correctAnswer}</span>
                    </div>
                </div>
                <div class="wrong-answer-feedback">
                    <span class="feedback-icon">💡</span>
                    ${item.feedback}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    wrongAnswersContainer.innerHTML = html;
}

// Restart Quiz - go back to setup screen
function restartQuiz() {
    initSetup();
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
finishBtn.addEventListener('click', finishQuiz);
restartBtn.addEventListener('click', restartQuiz);
if (skipBtn) skipBtn.addEventListener('click', skipQuestion);
if (dontKnowBtn) dontKnowBtn.addEventListener('click', dontKnow);

// Setup Event Listeners
if (startQuizBtn) startQuizBtn.addEventListener('click', startQuiz);
if (setAllBtn) setAllBtn.addEventListener('click', setAllQuestions);

// Start with setup screen
initSetup();
