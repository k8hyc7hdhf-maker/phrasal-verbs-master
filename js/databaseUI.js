const DatabaseUI = {

    show() {

        const verbs = Database.getAll();

        let html = `
        <div class="container">

            <h1>🛠 Database Builder</h1>

            <div class="card">

                <h2>📚 Total verbs: ${verbs.length}</h2>

                <button
                    class="answer"
                    id="addVerb">

                    ➕ Add New Verb

                </button>

                <hr>

                <h2>📖 Your Database</h2>
        `;

        verbs.forEach(verb => {

            html += `

                <button class="answer">

                    ${verb.verb}

                </button>

            `;

        });

        html += `

                <button
                    class="answer"
                    id="backHome">

                    ⬅ Back

                </button>

            </div>

        </div>
        `;

        UI.app.innerHTML = html;

        document
            .getElementById("backHome")
            .onclick = () => UI.home();

        document
            .getElementById("addVerb")
            .onclick = () => {

                alert("Coming in next step 😊");

            };

    }

};