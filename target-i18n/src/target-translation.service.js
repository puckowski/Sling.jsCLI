
class TranslationService {
    constructor() {
        this.messages = {
            greeting: 'Hello, world!'
        };

        this.messagesEs = {
            greeting: 'Hola, mundo!'
        };

        this.messageSet = {
            'en': this.messages,
            'es': this.messagesEs
        }
    }

    getMessages(languageCode = 'en') {
        languageCode = languageCode.toLowerCase();
        
        return this.messageSet[languageCode];
    }
}

export default TranslationService;
