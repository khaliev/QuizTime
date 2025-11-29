// ========== DOM Elements ==========
// Get references to all HTML elements we'll need to interact with
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// ========== Quiz Questions ==========
// Array of quiz questions with answers. Each question has a correct answer marked as true
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true }, // Correct answer
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true }, // Correct answer
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true }, // Correct answer
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true }, // Correct answer
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true }, // Correct answer
      { text: "Ag", correct: false },
    ],
  },
];

// ========== Quiz State Variables ==========
// Variables to track the current state of the quiz
let currentQuestionIndex = 0; // Tracks which question we're on (starts at 0)
let score = 0; // Keeps track of how many questions the user got right
let answersDisabled = false; // Flag to prevent clicking answers while processing, to avoid double click on a question and skewing (fausser le > ) score

// ========== Initialize Quiz Display ==========
// Set the total number of questions in the UI so users know how many there are from the start, like we were declaring the rules
// Display the total number of questions in the UI
totalQuestionsSpan.textContent = quizQuestions.length;
// Display the maximum possible score (same as total questions)
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  console.log("Quiz started");
}
restartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
  console.log("Quiz re-started");
}
