import * as XSoundsRepository from './x-sounds-repository';
import * as Logger from '../../infrastructure/logger';
import XSound from './x-sound';

function getAll(): Promise<XSound[]> {
  return XSoundsRepository.findAllOrderByNameAsc();
}

function getByName(soundName: string): Promise<XSound | null> {
  return XSoundsRepository.findByName(soundName);
}

async function incrementPlayCount(soundName: string): Promise<void> {
  const xSound = await XSoundsRepository.findByName(soundName);

  if (xSound) {
    const updatedSound = {
      ...xSound,
      timesPlayed: (xSound.timesPlayed + 1),
    };

    XSoundsRepository.replace(updatedSound);
  }
}

async function createNewSound(name: string, url: string, timesPlayed = 0): Promise<void> {
  const foundSound = await getByName(name);
  if (foundSound !== null) {
    throw new Error(`Dźwięk o nazwie "${name}" już jest w bazie`);
  }

  const xSound: XSound = {
    name,
    url,
    timesPlayed,
  };

  try {
    await XSoundsRepository.insert(xSound);
  } catch (e) {
    Logger.error('Could not insert new XSound to repository', 'xsound-service');
    throw new Error('Nie udało się dodać nowego dźwięku');
  }
}

export {
  getAll,
  getByName,
  incrementPlayCount,
  createNewSound,
};
