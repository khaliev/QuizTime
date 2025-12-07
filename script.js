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
      { text: "Mars", correct: true },
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
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
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

// Event listeners - attach click handler to start button
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  // reset quiz state / reset variables
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  // Remove "active" class from start screen and add it to quiz screen to show/hide them
  // The "active" class in CSS controls visibility (display: block/none or similar)
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state - allow answer clicking again
  answersDisabled = false;

  // Get the current question object from the array using the index
  const currentQuestion = quizQuestions[currentQuestionIndex];
  // Update the UI to show which question number we're on (add 1 because arrays start at 0)
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // Calculate progress as a percentage: (current / total) * 100
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  // Update the progress bar width based on percentage
  progressBar.style.width = progressPercent + "%";

  // Display the question text
  questionText.textContent = currentQuestion.question;
  // Clear previous answers - innerHTML = "" removes all child elements
  answersContainer.innerHTML = "";

  // Loop through each answer for this question
  currentQuestion.answers.forEach((answer) => {
    // Create a new button element to represent this answer
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // dataset allows storing custom data on HTML elements (accessible as button.dataset.correct)
    // This stores whether this specific button's answer is correct
    button.dataset.correct = answer.correct;
    // Attach click event handler to this button
    button.addEventListener("click", selectAnswer);
    // Add the button to the answers container (makes it appear on the page)
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check to prevent multiple clicks
  if (answersDisabled) return;
  // Set flag to true to disable further clicks until this question is fully processed
  answersDisabled = true;

  // event.target is the button that was clicked
  const selectedButton = event.target;
  // dataset.correct returns a string "true" or "false", compare with "true" to get a boolean
  const isCorrect = selectedButton.dataset.correct === "true";

  // Loop through all answer buttons and apply visual feedback
  Array.from(answersContainer.children).forEach((button) => {
    // Highlight the correct answer in green
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    // Highlight the user's wrong selection in red (only if they clicked it)
    else if (button === selectedButton) {
      button.classList.add("wrong");
    }
  });

  // Update score if the answer is correct
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Wait 1 second (1000 milliseconds) before moving to next question
  // This lets the user see the visual feedback (green/red highlighting)
  setTimeout(() => {
    currentQuestionIndex++;
    // Check if there are more questions remaining
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      // No more questions - quiz is complete
      showResults();
    }
  }, 1000);
}

function showResults() {
  // Hide the quiz screen and show the results screen
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  // Display the final score
  finalScoreSpan.textContent = score;

  // Calculate the percentage score (score / total questions) * 100
  const percentage = (score / quizQuestions.length) * 100;
  let message = "";

  // Set a message based on performance using conditional statements
  if (percentage === 100) {
    message = "Perfect score! Excellent work!";
  } else if (percentage >= 80) {
    message = "Great job! You have a strong understanding.";
  } else if (percentage >= 50) {
    message = "Good effort! Consider reviewing some material.";
  } else {
    message = "Keep trying! Practice makes perfect.";
  }

  // Display the personalized message to the user
  resultMessage.textContent = message;
}

// Attach click handler to the restart button
restartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
  // Hide the results screen and start the quiz again
  resultScreen.classList.remove("active");
  startQuiz();
}
