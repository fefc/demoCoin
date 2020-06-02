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

  constructor(public blockchainService: BlockchainService) {
    this.currencies = DEFAULT_CURRENCIES;
    this.selectedCurrency = this.currencies[0];

    this.toBeConvertedValue = 0;
    this.convertedValue = 0;
  }

  ngOnInit() {

  }

  convert() {
    this.blockchainService.convertToBtc(this.selectedCurrency, this.toBeConvertedValue).then((value) => {
      this.convertedValue = value;
    }).catch((error) => {
      console.log(error);
    });
  }

}
