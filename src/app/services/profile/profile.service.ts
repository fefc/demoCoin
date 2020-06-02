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
      const value: string = window.localStorage.getItem('my-coins')
      return value ? Number(value) : null;
    } else {
      return null;
    }
  }

  public setMyCointsAmount(value: number) {
    if (this.localStorageAvailable) {
      if (value) {
        window.localStorage.setItem('my-coins', value.toString());
      } else {
        this.clearStorage();
      }
    }
  }
}
