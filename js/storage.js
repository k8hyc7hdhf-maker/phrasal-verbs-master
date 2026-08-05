const Storage = {

    KEY: "phrasal_verbs_master",

    getData() {

        const data = localStorage.getItem(this.KEY);

        if (!data) {

            return {

                score: 0,
                answered: 0,
                bestScore: 0,
                theme: "light"

            };

        }

        return JSON.parse(data);

    },

    saveData(data) {

        localStorage.setItem(
            this.KEY,
            JSON.stringify(data)
        );

    },

    reset() {

        localStorage.removeItem(this.KEY);

    }

};