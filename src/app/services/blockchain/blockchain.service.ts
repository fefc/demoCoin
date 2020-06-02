import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

import { Rate } from './../../models/rate';
import { Details } from './../../models/details';

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

  public getDetails(): Promise<Details> {
    return new Promise<Details>(async (resolve, reject) => {
      try {
        const results = await Promise.all([
          this.httpClient.get('https://blockchain.info/q/marketcap').toPromise(),
          this.httpClient.get('https://blockchain.info/q/totalbc').toPromise(),
          this.httpClient.get('https://blockchain.info/q/24hrtransactioncount').toPromise(),
          this.httpClient.get('https://blockchain.info/q/24hrbtcsent').toPromise(),
          this.httpClient.get('https://blockchain.info/q/hashrate').toPromise(),
          this.httpClient.get('https://blockchain.info/q/getdifficulty').toPromise()
        ]);

        resolve({
          marketCap: Number(results[0]),
          totalBc:  Number(results[1]) / 100000000,
          twentyFourHrTransactionCount:  Number(results[2]),
          twentyFourHrBtcSent:  Number(results[3]) / 100000000,
          hashRate:  Number(results[4])  / 1000000000,
          getDifficulty:  Number(results[5])
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
