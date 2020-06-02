import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private localStorageAvailable: boolean;

  constructor() {
    if (window.localStorage) {
      this.localStorageAvailable = true;
    } else {
      this.localStorageAvailable = false;
    }
  }

  public isStorageAvailable() {
    return this.localStorageAvailable;
  }

  public clearStorage() {
    if (this.localStorageAvailable) {
      window.localStorage.clear();
    }
  }

  public getMyCoinsAmount(): number {
    if (this.localStorageAvailable) {
      return Number(window.localStorage.getItem('my-coins'));
    } else {
      return 0;
    }
  }

  public setMyCointsAmount(value: number) {
    if (this.localStorageAvailable) {
      window.localStorage.setItem('my-coins', value.toString());
    }
  }
}
