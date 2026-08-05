const Database = {

    verbs: [],

    async load() {

        const response = await fetch("data/phrasal_verbs.json");

        this.verbs = await response.json();

    },

    getAll() {

        return this.verbs;

    },

    add(verb) {

        verb.id = Date.now();

        this.verbs.push(verb);

    },

    update(id, newVerb) {

        const index = this.verbs.findIndex(v => v.id === id);

        if (index !== -1) {

            this.verbs[index] = newVerb;

        }

    },

    delete(id) {

        this.verbs = this.verbs.filter(v => v.id !== id);

    }

};