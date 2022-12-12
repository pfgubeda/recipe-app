import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;


  constructor(private storage: Storage) {
    this.init();
   }

   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    if(!this._storage){
            await this.init() ;
    }
    return await this._storage?.set(key, value);
  }

  public async get(key: string) : Promise<any> {
    if(!this._storage){
            await this.init() ;
    }
    return this._storage?.get(key);
  }

  //se supone q ni lo uso
  public async getAllKeys() : Promise<any> {
    if(!this._storage){
            await this.init() ;
    }
    return this._storage?.keys();
  }

  public async deleteAll(key: string) {
    if(!this._storage){
            await this.init() ;
    }
    return this._storage?.remove(key);
  }



}
