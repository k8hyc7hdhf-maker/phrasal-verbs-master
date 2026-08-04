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
            .onclick = App.startQuiz;

    }

};