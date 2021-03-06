import { mount, setState } from '../node_modules/slingjs/sling.min';
import HelloWorldComponent from './project/components/hello-world.component.js';
import TranslationService from './project/services/translation.service';

const translationService = new TranslationService();

setState({ translation: translationService, language: 'en' });

const helloComponent = new HelloWorldComponent();
mount('divHello', helloComponent);
