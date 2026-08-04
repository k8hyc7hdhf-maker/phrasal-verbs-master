const App = {

    async init() {

        await Quiz.load();

        UI.home();

    },

    startQuiz() {

        alert("Следующий этап -- экран Quiz 😊");

    }

};

App.init();