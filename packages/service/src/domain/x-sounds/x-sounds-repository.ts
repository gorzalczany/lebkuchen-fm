import XSound from '@service/domain/x-sounds/x-sound';
import Repository from '@service/infrastructure/repository';
import { Service } from 'typedi';
import DatabaseClient from '@service/infrastructure/storage';

@Service()
class XSoundsRepository extends Repository<XSound> {
  private constructor(storage: DatabaseClient) {
    super('x', storage);
  }

  findAllOrderByNameAsc(): Promise<XSound[]> {
    return this.collection.find({}).sort({ name: 1 }).toArray();
  }

  findAllByTagOrderByNameAsc(tag: string): Promise<XSound[]> {
    return this.collection.find({ tags: tag }).sort({ name: 1 }).toArray();
  }

  findByName(name: string): Promise<XSound | null> {
    return this.collection.findOne({ name });
  }

  async insert(sound: XSound): Promise<void> {
    await this.collection.insertOne(sound);
  }

  async replace(sound: XSound): Promise<void> {
    await this.collection.replaceOne({ _id: sound._id }, sound);
  }
}

export default XSoundsRepository;
