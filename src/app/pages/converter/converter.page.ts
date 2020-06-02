import { Component, OnInit } from '@angular/core';

import { BlockchainService } from './../../services/blockchain/blockchain.service';

const DEFAULT_CURRENCIES: Array<string> = ['EUR', 'USD', 'AUD', 'NZD', 'GBP'];

@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})
export class ConverterPage implements OnInit {

  private currencies: Array<string>;
  private selectedCurrency: string;

  private toBeConvertedValue: number;
  private convertedValue: number;

  private updateInterval: any;

  constructor(public blockchainService: BlockchainService) {
    this.currencies = DEFAULT_CURRENCIES;
    this.selectedCurrency = this.currencies[0];

    this.toBeConvertedValue = null;
    this.convertedValue = null;
  }

  ngOnInit() {
    //Update calculation every 30s, as rate can change
    this.updateInterval = setInterval(this.convert, 30 * 1000);
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }


  convert() {
    if (this.selectedCurrency && this.toBeConvertedValue) {
      this.blockchainService.convertToBtc(this.selectedCurrency, this.toBeConvertedValue).then((value) => {
        this.convertedValue = value;
      }).catch((error) => {
        console.log(error);
        this.convertedValue = null;
      });
    } else {
      this.convertedValue = null;
    }
  }

}
