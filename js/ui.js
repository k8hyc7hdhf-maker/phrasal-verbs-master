const UI = {

    app: document.getElementById("app"),

    home() {

        this.app.innerHTML = `
            <div class="container">

                <h1>🇬🇧 Phrasal Verbs Master</h1>

                <div class="card">

                    <h2>Master English Faster</h2>

                    <button class="answer" id="startBtn">
                        📚 Start Learning
                    </button>

                    <button class="answer">
                        ⭐ Favorites
                    </button>

<button class="answer" id="databaseBtn">
    🛠 Database Builder
</button>

                    <button class="answer">
                        📊 Statistics
                    </button>

                    <button class="answer">
                        ⚙ Settings
                    </button>

                </div>

            </div>
        `;

        document
            .getElementById("startBtn")
            .onclick = () => App.startQuiz();

  document
    .getElementById("databaseBtn")
    .onclick = () => {

        DatabaseUI.show();

    };

    },

    quiz(question, index, total) {

        this.app.innerHTML = `
            <div class="container">

                <h1>🇬🇧 Phrasal Verbs Master</h1>

                <div class="card">

                    <div class="progress">

                        Question ${index + 1} / ${total}

                    </div>

                    <div class="question">

    ${question.question}

</div>

<button id="speakButton" class="answer">

🔊 Listen

</button>

                    <div id="answers"></div>

                    <div id="result"></div>

                    <button id="nextButton" style="display:none">

                        Next →

                    </button>

                </div>

            </div>
        `;

        const answers = document.getElementById("answers");

        question.answers.forEach((answer, i) => {

            const button = document.createElement("button");

            button.className = "answer";

            button.textContent = answer.text;

            button.onclick = () => App.answer(i);

            answers.appendChild(button);

        });
        
        document
    .getElementById("speakButton")
    .onclick = () => {

        Audio.speak(
            question.answers[question.correct].text
        );

    };

    }

};