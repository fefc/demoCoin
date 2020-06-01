import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

const DEFAULT_CURRENCIES: Array<string> = ['USD', 'EUR', 'YEN', 'AUS', 'SOO', 'TOO', 'BOO', 'LOO'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private sellBtc: Boolean;
  private currencies: Array<string>;

  constructor(public alertController: AlertController) {
    this.sellBtc = true;
    this.currencies = JSON.parse(JSON.stringify(DEFAULT_CURRENCIES));
  }

  ngOnInit() {

  }

  async addCurrency() {
    let inputs = [];

    for (let currency of DEFAULT_CURRENCIES.filter((c) => this.currencies.indexOf(c) === -1)) {
      inputs.push({
        name: currency,
        type: 'checkbox',
        label: currency,
        value: currency,
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
            handler: (newCurrencies) => {
              for (let newCurrency of newCurrencies) {
                this.currencies.push(newCurrency);
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
    this.currencies.splice(index, 1);
  }

  swap() {
    this.sellBtc = !this.sellBtc;
  }

}
