let questions = [];
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const explanationEl = document.getElementById("explanation");
const progressEl = document.getElementById("progress");
const nextButton = document.getElementById("nextButton");

async function init() {
    const response = await fetch("questions.json");
    questions = await response.json();

    updateProgress();
    showQuestion();
}

function updateProgress() {
    progressEl.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;
}

function showQuestion() {

    const q = questions[currentQuestion];

    questionEl.textContent = q.question;

    answersEl.innerHTML = "";
    explanationEl.style.display = "none";
    explanationEl.innerHTML = "";

    nextButton.style.display = "none";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";

        button.textContent = answer.text;

        button.onclick = () => checkAnswer(index);

        answersEl.appendChild(button);

    });

}

init();
function checkAnswer(selectedIndex) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".answer");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === q.correct) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === q.correct) {
        score++;
    }

    let html = `
        <h3>💡 Hint</h3>
        <p>${q.hint}</p>

        <h3>📖 Meanings</h3>
    `;

    q.answers.forEach(answer => {
        html += `<p><strong>${answer.meaning}</strong></p>`;
    });

    html += `<hr><p><strong>Score:</strong> ${score} / ${questions.length}</p>`;

    explanationEl.innerHTML = html;
    explanationEl.style.display = "block";

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        questionEl.innerHTML =
            `🎉 Congratulations!<br><br>Your score: <b>${score} / ${questions.length}</b>`;

        answersEl.innerHTML = "";
        explanationEl.innerHTML = "";
        nextButton.style.display = "none";

        return;
    }

    updateProgress();
    showQuestion();

});