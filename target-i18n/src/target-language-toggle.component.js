import { markup, textNode, getState, setState } from 'slingjs';

class LanguageToggleComponent {

    constructor() {

    }

    onToggleLanguage() {
        const state = getState();
        const currentLanguage = state.language;

        if (currentLanguage === 'en') {
            setState({ translation: state.translation, language: 'es' });
        } else {
            setState({ translation: state.translation, language: 'en' });
        }
    }

    view() {
        return markup('div', {
            attrs: {

            },
            children: [
                markup('button', {
                    attrs: {
                        class: 'pure-button',
                        onclick: this.onToggleLanguage.bind(this),
                    },
                    children: [
                        textNode('Toggle Language')
                    ]
                })
            ]
        });
    }
}

export default LanguageToggleComponent;
