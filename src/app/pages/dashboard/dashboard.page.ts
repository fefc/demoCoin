import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { BlockchainService } from './../../services/blockchain/blockchain.service';

import { Rate } from './../../models/rate';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private sellBtc: Boolean;
  private availableRates: Array<Rate>;
  private displayedRates: Array<Rate>;

  constructor(public alertController: AlertController, public blockchainService: BlockchainService) {
    this.sellBtc = true;
    this.availableRates = [];
    this.displayedRates = [];
  }

  ngOnInit() {
    this.blockchainService.getExchangeRates().then((currencies) => {
      this.availableRates = currencies;
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
        header: 'Add currencies',
        inputs: inputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'Add',
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
        header: 'Add currencies',
        message: 'All currencies are already displayed',
        buttons: ['OK']
      });
    }

    await alert.present();
  }

  deleteCurrency(index: number) {
    this.displayedRates.splice(index, 1);
  }

  swap() {
    this.sellBtc = !this.sellBtc;
  }

}
