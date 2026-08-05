const Database = {

    verbs: [],

    async load() {

        // Сначала пробуем загрузить из localStorage
        if (this.loadLocal()) {
            return;
        }

        // Если нет -- загружаем из JSON
        const response = await fetch("data/phrasal_verbs.json");

        this.verbs = await response.json();

    },

    getAll() {

        return this.verbs;

    },

    add(verb) {

        verb.id = Date.now();

        this.verbs.push(verb);

        this.save();

    },

    update(id, newVerb) {

        const index = this.verbs.findIndex(v => v.id === id);

        if (index !== -1) {

            newVerb.id = id;

            this.verbs[index] = newVerb;

            this.save();

        }

    },

    delete(id) {

        this.verbs = this.verbs.filter(v => v.id !== id);

        this.save();

    },

    save() {

        localStorage.setItem(
            "phrasalDatabase",
            JSON.stringify(this.verbs)
        );

    },

    loadLocal() {

        const data = localStorage.getItem(
            "phrasalDatabase"
        );

        if (data) {

            this.verbs = JSON.parse(data);

            return true;

        }

        return false;

    },

    clearLocal() {

        localStorage.removeItem(
            "phrasalDatabase"
        );

    }

};