const QuestionGenerator = {

    verbs: [],

    async load() {

    await Database.load();

    this.verbs = Database.getAll();

},

    randomItem(array) {

        return array[Math.floor(Math.random() * array.length)];

    },

    shuffle(array) {

        return [...array].sort(() => Math.random() - 0.5);

    },

    generate() {

        const correctVerb = this.randomItem(this.verbs);

        const context = this.randomItem(correctVerb.contexts);

        // Все остальные глаголы
        const wrongVerbs = this.verbs.filter(
            v => v.id !== correctVerb.id
        );

        // Берём три случайных
        const wrongAnswers = this
            .shuffle(wrongVerbs)
            .slice(0, 3);

        const answers = [

            {
                text: correctVerb.example,
                meaning: `${correctVerb.verb} = ${correctVerb.meaning}`,
                correct: true
            }

        ];

        wrongAnswers.forEach(v => {

            answers.push({

                text: v.example,
                meaning: `${v.verb} = ${v.meaning}`,
                correct: false

            });

        });

        const shuffled = this.shuffle(answers);

        return {

            question: context,

            hint: `Think about "${correctVerb.meaning}".`,

            answers: shuffled,

            correct: shuffled.findIndex(a => a.correct)

        };

    }

};