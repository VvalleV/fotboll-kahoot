
// ALL QUESTIONS

const questions = [

    {
        question: "Who opend the score line in the 2008 champions league final?",
        image: "2008Final.jpg",
        answers: [
            "Van Der Sar",
            "Cristiano Ronaldo",
            "Rio Ferdinand",
            "Wane Rooney "
        ],
        correct: 1
    },

    {
        question: "In which year was Manchester United founded?",
        image: "FirstTeam.jpg",
        answers: [
            "1878",
            "1885",
            "1902",
            "1910"
        ],
        correct: 0
    },

    {
        question: "Who did Manchester United bring in to replace Sir Alex Ferguson after he retierd?",
        image: "SirAlex.jpg",
        answers: [
            "Jose Mourinho",
            "Arsen Wenger",
            "David Moyes",
            "Pep Guardiola "
        ],
        correct: 2
    },

    {
        question: "Who is Manchester Uniteds most expencive signing ever?",
        image: "Pogba.jpg",
        answers: [
            "Wayne Rooney",
            "Paul Pogba",
            "Cristiano Ronaldo",
            "Jadon Sancho"
        ],
        correct: 1
    },

    {
        question: "Who are the current owners of Manchester United?",
        image: "Glazers.jpg",
        answers: [
            "The Glazer Family",
            "Florentino Perez",
            "Joan Laporta",
            "Robin Devran Kara "
        ],
        correct: 0
    },

    {
        question: "Which team did Manchester United beat in the 2008 Champions League final?",
        image: "Cl2008.jpg",
        answers: [
            "Barcelona",
            "Bayern Munich",
            "Chelsea",
            "Liverpool"
        ],
        correct: 2
    },

    {
        question: "What is the max capacity of old trafford?",
        image: "OldTrafford.jpg",
        answers: [
            "74,158 seats",
            "83,653 seats",
            "54,638 seats",
            "101,000 seats"
        ],
        correct: 0
    },

    {
        question: "What was the nickname for Manchester United in the  2017-2020 era?",
        image: "Blackchester United.jpg",
        answers: [
            "Blackchester United",
            "The Black Devils",
            "The Blacks",
            "The Golden Boys"
        ],
        correct: 0
    },

    {
        question: "Who is Manchester Uniteds Rivals?",
        image: "Rivals.jpg",
        answers: [
            "Arsenal",
            "Manchester City",
            "Liverpool",
            "Chelsea"
        ],
        correct: 2
    },

];


// VARIABLES

let currentQuestion = 0;
let score = 0;
let playerName = "";
let answered = false;


// HTML ELEMENTS

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const nameInput = document.getElementById("player-name");
const nameError = document.getElementById("name-error");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const answerButtons = document.querySelectorAll(".answer-button");

const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");

const finalScore = document.getElementById("final-score");
const finalPlayer = document.getElementById("final-player");
const resultMessage = document.getElementById("result-message");

const leaderboardBody = document.getElementById("leaderboard-body");


// START QUIZ

document.getElementById("start-button").addEventListener("click", function () {

    playerName = nameInput.value.trim();

    if (playerName === "") {
        nameError.textContent = "Please enter your name first!";
        return;
    }

    nameError.textContent = "";

    currentQuestion = 0;
    score = 0;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    document.getElementById("player-display").textContent =
        "Player: " + playerName;

    showQuestion();

});


// SHOW QUESTION

function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) + " / " + questions.length;

    questionText.textContent = question.question;

    questionImage.src = question.image;

    feedback.textContent = "";

    nextButton.classList.add("hidden");

    answerButtons.forEach(function (button, index) {

        button.textContent = question.answers[index];

        button.disabled = false;

        button.classList.remove("correct", "wrong");

    });

}


// CHECK ANSWER

answerButtons.forEach(function (button, index) {

    button.addEventListener("click", function () {

        if (answered) {
            return;
        }

        answered = true;

        const correctAnswer = questions[currentQuestion].correct;

        if (index === correctAnswer) {

            score++;

            feedback.textContent = "Correct! Well done!";
            feedback.style.color = "#28c840";

            button.classList.add("correct");

        } else {

            feedback.textContent = "Wrong answer!";

            feedback.style.color = "#ff263e";

            button.classList.add("wrong");

            answerButtons[correctAnswer].classList.add("correct");

        }

        answerButtons.forEach(function (answer) {
            answer.disabled = true;
        });

        nextButton.classList.remove("hidden");

    });

});


// NEXT QUESTION

nextButton.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishQuiz();

    }

});


// FINISH QUIZ

function finishQuiz() {

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalPlayer.textContent = "Player: " + playerName;

    finalScore.textContent = score + " / " + questions.length;

    resultMessage.textContent =
        "You got " + score + " out of " + questions.length + " questions correct!";

    saveScore();

}


// SAVE SCORE

function saveScore() {

    let leaderboard = JSON.parse(
        localStorage.getItem("manUnitedLeaderboard")
    ) || [];

    const newResult = {
        name: playerName,
        score: score
    };

    leaderboard.push(newResult);

    leaderboard.sort(function (a, b) {
        return b.score - a.score;
    });

    localStorage.setItem(
        "manUnitedLeaderboard",
        JSON.stringify(leaderboard)
    );

    showLeaderboard();

}


// SHOW LEADERBOARD

function showLeaderboard() {

    let leaderboard = JSON.parse(
        localStorage.getItem("manUnitedLeaderboard")
    ) || [];

    leaderboardBody.innerHTML = "";

    leaderboard.slice(0, 10).forEach(function (player, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td></td>
            <td>${player.score} / ${questions.length}</td>
        `;

        row.children[1].textContent = player.name;

        leaderboardBody.appendChild(row);

    });

}


// RESTART QUIZ

document.getElementById("restart-button").addEventListener("click", function () {

    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    nameInput.value = "";

});


// CLEAR LEADERBOARD

document.getElementById("clear-button").addEventListener("click", function () {

    const confirmClear = confirm("Are you sure you want to clear the leaderboard?");

    if (confirmClear) {

        localStorage.removeItem("manUnitedLeaderboard");

        showLeaderboard();

    }

});


// LOAD LEADERBOARD WHEN PAGE OPENS

showLeaderboard();
