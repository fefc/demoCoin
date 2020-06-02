import { Component, OnInit } from '@angular/core';

const DEFAULT_CURRENCIES: Array<string> = ['USD', 'EUR', 'YEN', 'AUS', 'SOO', 'TOO', 'BOO', 'LOO'];

@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})
export class ConverterPage implements OnInit {

  private sellBtc: Boolean;
  private currencies: Array<string>;

  private toBeConvertedValue: number;

  constructor() {
    this.sellBtc = true;
    this.currencies = JSON.parse(JSON.stringify(DEFAULT_CURRENCIES));

    this.toBeConvertedValue = 0;
  }

  ngOnInit() {

  }

  convertedValue() {
    return this.toBeConvertedValue * 1.5;
  }

}
