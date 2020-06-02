import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

import { Rate } from './../../models/rate';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  constructor(private  httpClient : HttpClient) {

  }

  public getExchangeRates(): Promise<Array<Rate>> {
    return new Promise<Array<Rate>>(async (resolve, reject) => {
      try {
        const rates = await this.httpClient.get('https://blockchain.info/ticker').toPromise();
        let formattedValues: Array<Rate> = [];

        for (let currency of Object.keys(rates)) {
          formattedValues.push({
            currency: currency,
            sellPrice: rates[currency].sell,
            buyPrice: rates[currency].buy
          });
        }

        resolve(formattedValues);
      }
      catch (error) {
        reject(error);
      }
    });
  }

}
