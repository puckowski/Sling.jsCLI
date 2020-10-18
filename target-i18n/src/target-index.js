import { initialize, mount, setState } from '../node_modules/slingjs/sling.min';
import { initializeChangeDetector } from '../node_modules/slingjs/sling-change.min';
import HelloWorldComponent from './project/components/hello-world.component.js';
import TranslationService from './project/services/translation.service';

initialize();
initializeChangeDetector();

const translationService = new TranslationService();

setState({ translation: translationService, language: 'en' });

const helloComponent = new HelloWorldComponent();
mount('divHello', helloComponent);
