const questions = [
    {
        id: 1,
        text: "Which type of scaling involves adding more power (CPU, RAM) to an existing server?",
        options: ["Horizontal Scaling", "Vertical Scaling", "Load Balancing", "Sharding"],
        correctIndex: 1,
        feedback: "Vertical Scaling (Scaling Up) means upgrading the single machine's capacity."
    },
    {
        id: 2,
        text: "What is the primary purpose of a Load Balancer?",
        options: ["To store data permanently", "To distribute incoming traffic across multiple servers", "To encrypt user data", "To compiling code faster"],
        correctIndex: 1,
        feedback: "Load balancers distribute traffic to prevent bottlenecks and ensure high availability."
    },
    {
        id: 3,
        text: "What does Caching primarily improve?",
        options: ["Write Speed", "Read Latency / Performance", "Data Consistency", "Security"],
        correctIndex: 1,
        feedback: "Caching serves frequently requested data from fast memory, reducing read latency."
    },
    {
        id: 4,
        text: "True or False: Horizontal scaling has a strict hardware limit (ceiling).",
        options: ["True", "False"],
        correctIndex: 1,
        feedback: "False. Horizontal scaling (adding more machines) is theoretically infinite, unlike Vertical scaling."
    },
    {
        id: 5,
        text: "What is 'Database Sharding'?",
        options: ["Backing up the database", "Compressing database files", "Splitting a large database into smaller chunks", "Deleting old data"],
        correctIndex: 2,
        feedback: "Sharding partitions data across multiple nodes to handle large datasets efficiently."
    },
    {
        id: 6,
        text: "If a system is 'Reliable', what does that mean?",
        options: ["It never fails", "It functions correctly even when faults occur", "It is very fast", "It is free of bugs"],
        correctIndex: 1,
        feedback: "Reliability means the system can tolerate and recover from faults (machine failure, network issues) without stopping."
    },
    {
        id: 7,
        text: "What is a 'Single Point of Failure' (SPOF)?",
        options: ["A bug in the code", "A component which, if it fails, stops the entire system", "The master database", "A failed login attempt"],
        correctIndex: 1,
        feedback: "A SPOF ensures that if that one part breaks, everything breaks. Redundancy aims to remove SPOFs."
    },
    {
        id: 8,
        text: "In a Master-Slave architecture, what are Slave (Replica) nodes typically used for?",
        options: ["Write operations", "Read operations", "Deleting data", "Managing the Master"],
        correctIndex: 1,
        feedback: "Reads are often offloaded to Replicas to scale read performance, while Writes go to the Master."
    },
    {
        id: 9,
        text: "What is 'Latency'?",
        options: ["The size of the hard drive", "The number of users logged in", "The delay before a data transfer begins", "The cost of the server"],
        correctIndex: 2,
        feedback: "Latency is the delay (lag) in the system."
    },
    {
        id: 10,
        text: "Which technique ensures data remains safe if a hard drive fails?",
        options: ["Caching", "Sharding", "Redundancy / Replication", "Load Balancing"],
        correctIndex: 2,
        feedback: "Replication (Redundancy) means keeping copies of data so failure of one drive doesn't lose the data."
    }
];

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
const quizContainer = document.getElementById('quiz-container');
const questionBox = document.getElementById('question-box');
const resultBox = document.getElementById('result-box');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Init
function initQuiz() {
    // Check sessionStorage
    const savedSession = sessionStorage.getItem('systemDesignQuiz');
    if (savedSession) {
        // We could restore state, but usually people want to start fresh or see results
        // For this task, let's just start fresh but allow session saving for results
    }

    // Randomize questions
    currentQuestions = [...questions].sort(() => Math.random() - 0.5);
    
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
    
    // Save to session
    sessionStorage.setItem('systemDesignQuiz', JSON.stringify({
        score: score,
        total: currentQuestions.length,
        date: new Date()
    }));
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
finishBtn.addEventListener('click', finishQuiz);
restartBtn.addEventListener('click', initQuiz);

// Start
initQuiz();
