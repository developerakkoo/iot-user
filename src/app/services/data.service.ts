import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public storage: Storage) { 
    this.init();
  }


  public init(){
    this.storage.create();
  }

  public set(key, value){
    return this.storage?.set(key, value);
  }

  public get(key){
    return this.storage?.get(key);
  }

  public remove(key){
    return this.storage?.remove(key);
  }


  public clear(){
    return this.storage?.clear();
  }
}
