import mitt from 'mitt'
import SpeechService from './SpeechService';

const CommandEmitter = (() => {
    const emitter = mitt();
    return {
        emitter,
        observers: [
            new SpeechService(emitter),
        ],
        emit(command, ...options) {
            this.emitter.emit(command, { options });
        },
    };
})();

export default CommandEmitter;
