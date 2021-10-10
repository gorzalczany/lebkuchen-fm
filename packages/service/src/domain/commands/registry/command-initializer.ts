import AddCommand from '../processors/add-command';
import CommandRegistryService from './command-registry-service';
import HelpCommand from '../processors/help-command';
import ListXCommand from '../processors/list-x-command';
import PauseCommand from '../processors/pause-command';
import QueueCommand from '../processors/queue-command';
import RandomCommand from '../processors/random-command';
import ResumeCommand from '../processors/resume-command';
import SayCommand from '../processors/say-command';
import SearchCommand from '../processors/search-command';
import SkipCommand from '../processors/skip-command';
import SpeedCommand from '../processors/speed-command';
import TagAddCommand from '../processors/tag-add-command';
import TagList from '../processors/tag-list-command';
import TagRemove from '../processors/tag-remove-command';
import TagSearch from '../processors/tag-search-command';
import TagShow from '../processors/tag-show-command';
import VolumeCommand from '../processors/volume-command';
import XCommand from '../processors/x-command';

function initialize(): void {
  [
    AddCommand,
    HelpCommand,
    ListXCommand,
    PauseCommand,
    QueueCommand,
    RandomCommand,
    ResumeCommand,
    SayCommand,
    SearchCommand,
    SkipCommand,
    SpeedCommand,
    TagAddCommand,
    TagList,
    TagRemove,
    TagSearch,
    TagShow,
    VolumeCommand,
    XCommand,
  ].forEach((command) => CommandRegistryService.instance.register(command));
}

export {
  initialize,
};
