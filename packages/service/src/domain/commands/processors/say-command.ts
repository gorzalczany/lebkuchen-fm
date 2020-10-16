import { SayEvent } from '../../../event-stream/model/events';
import Command from '../model/command';
import CommandDefinition from '../model/command-definition';
import CommandProcessingResponse, { makeSingleTextProcessingResponse } from '../model/command-processing-response';
import PlayerEventStream from '../../../event-stream/player-event-stream';

async function sayCommandProcessor(command: Command): Promise<CommandProcessingResponse> {
  const text = command.rawArgs;
  const eventMessage: SayEvent = {
    id: 'SayEvent',
    text,
  };

  PlayerEventStream.instance.sendToEveryone(eventMessage);

  return makeSingleTextProcessingResponse(`_"${text}"_`, false);
}

const sayCommandDefinition: CommandDefinition = {
  key: 'say',
  processor: sayCommandProcessor,
  helpMessage: 'Prosi spikera o odczytanie wiadomości',
  helpUsages: [
    '<message>',
    'to jest moja fantastyczna wiadomość',
  ],
};

export default sayCommandDefinition;
