const Quiz = {

    questions: [],
    current: 0,
    score: 0,

    // true = использовать генератор
    // false = использовать questions.json
    useGenerator: true,

    async load() {

        if (this.useGenerator) {

            await QuestionGenerator.load();

            this.questions = [];

            // Пока создаём 20 вопросов
            for (let i = 0; i < 20; i++) {

                this.questions.push(
                    QuestionGenerator.generate()
                );

            }

        } else {

            const response = await fetch("data/questions.json");

            this.questions = await response.json();

        }

    },

    getCurrentQuestion() {

        return this.questions[this.current];

    },

    answer(index) {

        const question = this.getCurrentQuestion();

        if (index === question.correct) {

            this.score++;

            return true;

        }

        return false;

    },

    next() {

        this.current++;

    },

    hasNext() {

        return this.current < this.questions.length;

    },

    restart() {

        this.current = 0;
        this.score = 0;

    }

};