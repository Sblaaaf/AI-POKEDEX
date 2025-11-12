// services/indexedDbService.ts
import { Pokemon, TokenBalance } from '../types';

const DB_NAME = 'ai-pokedex-db';
const DB_VERSION = 1; 
const POKEMONS_STORE = 'pokemons';
const SETTINGS_STORE = 'settings';


class IndexedDbService {
  private db: IDBDatabase | null = null;

  private async openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(POKEMONS_STORE)) {
          db.createObjectStore(POKEMONS_STORE, { keyPath: 'id', autoIncrement: true });
        }
        
        if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
          db.createObjectStore(SETTINGS_STORE, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  private async withTransaction<T>(
    storeName: string,
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => Promise<T>,
  ): Promise<T> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
      callback(store).then(resolve).catch(reject);
    });
  }

  public async getAllPokemons(): Promise<Pokemon[]> {
    return this.withTransaction(POKEMONS_STORE, 'readonly', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
          const pokemons = request.result as Pokemon[];
          // Sort by creation date, newest first
          pokemons.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          resolve(pokemons);
        };
        request.onerror = () => reject(request.error);
      });
    });
  }

  public async addPokemon(pokemonData: Omit<Pokemon, 'id'>): Promise<Pokemon> {
    return this.withTransaction(POKEMONS_STORE, 'readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.add(pokemonData);
        request.onsuccess = () => {
          const newPokemon = { ...pokemonData, id: request.result as number };
          resolve(newPokemon);
        };
        request.onerror = () => reject(request.error);
      });
    });
  }

  public async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return this.withTransaction(POKEMONS_STORE, 'readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.put(pokemon);
        request.onsuccess = () => resolve(pokemon);
        request.onerror = () => reject(request.error);
      });
    });
  }

  public async deletePokemon(id: number): Promise<void> {
    return this.withTransaction(POKEMONS_STORE, 'readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }

  public async getTokenBalance(): Promise<number | undefined> {
    return this.withTransaction(SETTINGS_STORE, 'readonly', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.get('tokenBalance');
        request.onsuccess = () => {
          const balance = request.result as TokenBalance | undefined;
          resolve(balance?.amount);
        };
        request.onerror = () => reject(request.error);
      });
    });
  }

  public async setTokenBalance(amount: number): Promise<void> {
    const newBalance: TokenBalance = { id: 'tokenBalance', amount };
    return this.withTransaction(SETTINGS_STORE, 'readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.put(newBalance);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }
}

export const indexedDbService = new IndexedDbService();