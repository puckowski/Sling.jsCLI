import { initialize, markup, textNode, version, mount } from '../node_modules/slingjs/sling.min';
import translate from 'translate.js'
import TranslationService from './project/services/translation.service';

initialize();

const translationService = new TranslationService();
const t = translate(translationService.getMessages());

class HelloWorldComponent {

    view() {
        return markup('div', {
            attrs: {
                class: 'div-content'
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
                })
            ]
        });
    }
}

const helloComponent = new HelloWorldComponent();
mount('divHello', helloComponent);
