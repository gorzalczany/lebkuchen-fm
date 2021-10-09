import { Collection, Db, MongoClient } from 'mongodb';
import { Service } from 'typedi';
import Configuration from '../infrastructure/configuration';
import Logger from '../infrastructure/logger';

@Service()
class Storage {
  private static logger = new Logger('mongo-client');
  private client: MongoClient;
  private db?: Db;

  constructor(private configuration: Configuration) {
    this.client = new MongoClient(this.configuration.MONGODB_URI, { useUnifiedTopology: true });
  }

  async connect(): Promise<void> {
    await this.client.connect();

    this.db = this.client.db(this.configuration.DATABASE_NAME);
    await this.db.command({ ping: 1 });

    Storage.logger.info('Connected to MongoDB server');
  }

  collection<T>(collectionName: string): Collection<T> {
    if (!this.db) {
      throw new Error('Storage must be connected before calling collection');
    }
    return this.db.collection(collectionName);
  }
}

export default Storage;
