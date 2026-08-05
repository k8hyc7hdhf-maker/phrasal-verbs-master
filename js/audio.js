const Audio = {

    speak(text) {

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        const voices = speechSynthesis.getVoices();

        const englishVoice = voices.find(
            voice => voice.lang.startsWith("en")
        );

        if (englishVoice) {
            utterance.voice = englishVoice;
        }

        utterance.lang = "en-US";
        utterance.rate = 0.9;
        utterance.pitch = 1;

        speechSynthesis.speak(utterance);

    }

};