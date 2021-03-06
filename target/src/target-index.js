import { markup, textNode, version, mount } from '../node_modules/slingjs/sling.min';

class HelloWorldComponent {

    view() {
        return markup('h1', {
            attrs: {
                style: 'color: #808080;',
                class: 'div-content',
                id: 'tagHello'
            },
            children: [
                textNode('Sling.js v' + version())
            ]
        })
    }
}

const helloComponent = new HelloWorldComponent();
mount('tagHello', helloComponent);
