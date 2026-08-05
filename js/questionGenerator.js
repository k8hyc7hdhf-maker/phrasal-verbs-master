const QuestionGenerator = {

    verbs: [],

    async load() {

        const response = await fetch("data/phrasal_verbs.json");

        this.verbs = await response.json();

    },

    randomItem(array) {

        return array[Math.floor(Math.random() * array.length)];

    },

    findVerb(name) {

        return this.verbs.find(v => v.verb === name);

    },

    generate() {

        const verb = this.randomItem(this.verbs);

        const context = this.randomItem(verb.contexts);

        const options = [];

        // Правильный ответ
        options.push({
            text: verb.example,
            meaning: `${verb.verb} = ${verb.meaning}`,
            correct: true
        });

        // Неправильные ответы
        verb.distractors.forEach(name => {

            const wrongVerb = this.findVerb(name);

            if (!wrongVerb) return;

            options.push({
                text: wrongVerb.example,
                meaning: `${wrongVerb.verb} = ${wrongVerb.meaning}`,
                correct: false
            });

        });

        // Перемешиваем варианты ответов
        options.sort(() => Math.random() - 0.5);

        const correctIndex = options.findIndex(o => o.correct);

        return {

            question: context,

            hint: `Think about "${verb.meaning}".`,

            answers: options,

            correct: correctIndex

        };

    }

};