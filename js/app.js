const App = {

    async init() {

        try {

            await Quiz.load();

            UI.home();

        } catch (error) {

            document.body.innerHTML = `
<pre style="color:red;padding:20px;white-space:pre-wrap;">
${error.stack}
</pre>
            `;

        }

    },

    startQuiz() {

        Quiz.restart();

        this.showQuestion();

    },

    showQuestion() {

        const question = Quiz.getCurrentQuestion();

        UI.quiz(
            question,
            Quiz.current,
            Quiz.questions.length
        );

        const nextButton = document.getElementById("nextButton");

        nextButton.onclick = () => {

            Quiz.next();

            if (Quiz.hasNext()) {

                this.showQuestion();

            } else {

                this.showResults();

            }

        };

    },

    answer(index) {

        const correct = Quiz.answer(index);

        const question = Quiz.getCurrentQuestion();

        const buttons = document.querySelectorAll(".answer");

        buttons.forEach((button, i) => {

            button.disabled = true;

            if (i === question.correct) {

                button.classList.add("correct");

            } else if (i === index) {

                button.classList.add("wrong");

            }

        });

        const result = document.getElementById("result");

        let html = `<h3>💡 Hint</h3>`;
        html += `<p>${question.hint}</p>`;
        html += `<h3>📖 Meanings</h3>`;

        question.answers.forEach(answer => {
            html += `<p>${answer.meaning}</p>`;
        });

        if (correct) {
            html += `<p>✅ Correct!</p>`;
        } else {
            html += `<p>❌ Incorrect</p>`;
        }

        result.innerHTML = html;

        document.getElementById("nextButton").style.display = "block";

    },

    showResults() {

        UI.app.innerHTML = `

        <div class="container">

            <h1>🏆 Results</h1>

            <div class="card">

                <h2>

                    Score

                </h2>

                <h1>

                    ${Quiz.score} / ${Quiz.questions.length}

                </h1>

                <button
                    class="answer"
                    id="restart">

                    🔄 Restart

                </button>

            </div>

        </div>

        `;

        document
            .getElementById("restart")
            .onclick = () => UI.home();

    }

};

App.init();