import Command from '@service/domain/commands/model/command';
import { CommandProcessingResponse } from '@service/domain/commands/model/command-processing-response';
import CommandProcessor from '@service/domain/commands/model/command-processor';
import RegisterCommand from '@service/domain/commands/registry/register-command';
import { SayEvent } from '@service/event-stream/model/events';
import PlayerEventStream from '@service/event-stream/player-event-stream';
import { Service } from 'typedi';

@RegisterCommand
@Service()
class SayCommand extends CommandProcessor {
  constructor(private playerEventStream: PlayerEventStream) {
    super();
  }

  async execute(command: Command): Promise<CommandProcessingResponse> {
    const text = command.rawArgs;
    const eventMessage: SayEvent = {
      id: 'SayEvent',
      text,
    };

    this.playerEventStream.sendToEveryone(eventMessage);

    return {
      messages: [
        { text: `_"${text}"_`, type: 'MARKDOWN' },
      ],
      isVisibleToIssuerOnly: false,
    };
  }

  get key(): string {
    return 'say';
  }

  get shortKey(): (string | null) {
    return null;
  }

  get helpMessage(): string {
    return 'Prosi spikera o odczytanie wiadomości';
  }

  get helpUsages(): (string[] | null) {
    return [
      '<message>',
      'to jest moja fantastyczna wiadomość',
    ];
  }
}

export default SayCommand;
