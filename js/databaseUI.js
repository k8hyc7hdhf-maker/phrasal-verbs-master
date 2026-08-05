const DatabaseUI = {

    show() {

        const verbs = Database.getAll();

        let html = `
        <div class="container">

            <h1>🛠 Database Builder</h1>

            <div class="card">

                <h2>📚 Total verbs: ${verbs.length}</h2>

                <button class="answer" id="addVerb">
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

                <hr>

                <button class="answer" id="exportBtn">
                    📤 Export JSON
                </button>

                <button class="answer" id="importBtn">
                    📥 Import JSON
                </button>

                <input
                    type="file"
                    id="importFile"
                    accept=".json"
                    style="display:none">

                <button class="answer" id="backHome">
                    ⬅ Back
                </button>

            </div>

        </div>
        `;

        UI.app.innerHTML = html;

        // Back
        document
            .getElementById("backHome")
            .onclick = () => UI.home();

        // Add
        document
            .getElementById("addVerb")
            .onclick = () => this.showAddForm();

        // Export
        document
            .getElementById("exportBtn")
            .onclick = () => {

                Database.exportJSON();

            };

        // Import
        document
            .getElementById("importBtn")
            .onclick = () => {

                document
                    .getElementById("importFile")
                    .click();

            };

        document
            .getElementById("importFile")
            .onchange = (event) => {

                const file = event.target.files[0];

                if (file) {

                    Database.importJSON(file);

                }

            };

    },

    showAddForm() {

        UI.app.innerHTML = `

        <div class="container">

            <h1>➕ New Phrasal Verb</h1>

            <div class="card">

                <input
                    id="verb"
                    placeholder="Verb">

                <input
                    id="meaningEn"
                    placeholder="Meaning (EN)">

                <input
                    id="meaningRu"
                    placeholder="Meaning (RU)">

                <input
                    id="level"
                    placeholder="Level (A2/B1/B2)"
                    value="A2">

                <button
                    class="answer"
                    id="save">

                    💾 Save

                </button>

                <button
                    class="answer"
                    id="cancel">

                    ⬅ Cancel

                </button>

            </div>

        </div>
        `;

        document
            .getElementById("cancel")
            .onclick = () => this.show();

        document
            .getElementById("save")
            .onclick = () => this.saveVerb();

    },

    saveVerb() {

        Database.add({

            verb: document.getElementById("verb").value,

            meaning_en: document.getElementById("meaningEn").value,

            meaning_ru: document.getElementById("meaningRu").value,

            level: document.getElementById("level").value,

            contexts: [],

            examples: []

        });

        this.show();

    }

};