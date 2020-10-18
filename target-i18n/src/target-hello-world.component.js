import { markup, textNode, version } from '../../../node_modules/slingjs/sling.min';
import { getState } from 'slingjs';
import LanguageToggleComponent from './language-toggle.component';
import translate from 'translate.js'

class HelloWorldComponent {

    constructor() {

    }

    view() {
        const state = getState();
        const translationService = state.translation;
        const t = translate(translationService.getMessages(state.language));

        return markup('div', {
            attrs: {
                class: 'div-content',
                id: 'divHello'
            },
            children: [
                markup('h1', {
                    attrs: {
                        style: 'color: #808080;'
                    },
                    children: [
                        textNode('Sling.js v' + version())
                    ]
                }),
                markup('p', {
                    attrs: {

                    },
                    children: [
                        textNode(t('greeting'))
                    ]
                }),
                new LanguageToggleComponent().view()
            ]
        });
    }
}

export default HelloWorldComponent;
