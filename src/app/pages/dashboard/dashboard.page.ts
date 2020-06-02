import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { BlockchainService } from './../../services/blockchain/blockchain.service';
import { ProfileService } from './../../services/profile/profile.service';

import { Rate } from './../../models/rate';

const ONE_BTC: number = 1;
const DECIMALS: number = 2;

const DEFAULT_CURRENCIES: Array<string> = ['EUR', 'USD', 'AUD', 'NZD', 'GBP'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private readonly ONE_BTC: number = ONE_BTC;
  private readonly DECIMALS: number = DECIMALS;

  private availableRates: Array<Rate>;
  private displayedRates: Array<Rate>;

  private myCoins: number;
  private myCoinsEur: number;

  constructor(public alertController: AlertController,
              public blockchainService: BlockchainService,
              public profileService: ProfileService) {
    this.availableRates = [];
    this.displayedRates = [];

    this.myCoins = null;
    this.myCoinsEur = null;
  }

  ngOnInit() {
    this.blockchainService.getExchangeRates().then((rates) => {
      this.availableRates = rates;
      this.displayedRates = rates.filter((r) => DEFAULT_CURRENCIES.includes(r.currency));

      this.myCoins = this.profileService.getMyCoinsAmount();
      this.convert();

    }).catch((error) => {
      console.log(error);
    });
  }

  async addCurrency() {
    let inputs = [];

    for (let rate of this.availableRates.filter((c) => this.displayedRates.indexOf(c) === -1)) {
      inputs.push({
        name: rate.currency,
        type: 'checkbox',
        label: rate.currency,
        value: rate,
        checked: false
      });
    }

    let alert: any;

    if (inputs.length > 0) {
      alert = await this.alertController.create({
        header: 'Währungen hinzufügen',
        inputs: inputs,
        buttons: [
          {
            text: 'Zurück',
            role: 'cancel',
          }, {
            text: 'Hinzufügen',
            handler: (newRates) => {
              for (let newRate of newRates) {
                this.displayedRates.push(newRate);
              }
            }
          }
        ]
      });

    } else {
      alert = await this.alertController.create({
        header: 'Währungen hinzufügen',
        message: 'Alle Währungen werden bereits angezeigt.',
        buttons: ['OK']
      });
    }

    await alert.present();
  }

  deleteCurrency(index: number) {
    this.displayedRates.splice(index, 1);
  }

  convert() {
    if (this.myCoins) {
      this.blockchainService.convertToBtc('EUR', this.myCoins).then((value) => {
        this.myCoinsEur = value;
      }).catch((error) => {
        console.log(error);
        this.myCoinsEur = null;
      });
    } else {
      this.myCoinsEur = null;
    }
  }
}
