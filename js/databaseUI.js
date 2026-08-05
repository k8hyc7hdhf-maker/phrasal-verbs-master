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
        <button
            class="answer editVerb"
            data-id="${verb.id}">

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
        
        document
    .querySelectorAll(".editVerb")
    .forEach(button => {

        button.onclick = () => {

            const id = Number(button.dataset.id);

            this.showEditForm(id);

        };

    });

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

,

showEditForm(id) {

    const verb = Database.getAll().find(v => v.id === id);

    if (!verb) return;

    UI.app.innerHTML = `

    <div class="container">

        <h1>✏ Edit Phrasal Verb</h1>

        <div class="card">

            <input
                id="verb"
                value="${verb.verb}">

            <input
                id="meaningEn"
                value="${verb.meaning_en}">

            <input
                id="meaningRu"
                value="${verb.meaning_ru}">

            <input
                id="level"
                value="${verb.level}">

            <button
                class="answer"
                id="saveEdit">

                💾 Save Changes

            </button>

            <button
                class="answer"
                id="deleteVerb">

                🗑 Delete

            </button>

            <button
                class="answer"
                id="cancel">

                ⬅ Back

            </button>

        </div>

    </div>
    `;

    document
        .getElementById("cancel")
        .onclick = () => this.show();

    document
        .getElementById("deleteVerb")
        .onclick = () => {

            if (confirm("Delete this phrasal verb?")) {

                Database.delete(id);

                this.show();

            }

        };

    document
        .getElementById("saveEdit")
        .onclick = () => {

            Database.update(id, {

                verb: document.getElementById("verb").value,

                meaning_en: document.getElementById("meaningEn").value,

                meaning_ru: document.getElementById("meaningRu").value,

                level: document.getElementById("level").value,

                contexts: verb.contexts,

                examples: verb.examples

            });

            this.show();

        };

}

};