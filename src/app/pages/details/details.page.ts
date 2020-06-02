import { Component, OnInit } from '@angular/core';

import { BlockchainService } from './../../services/blockchain/blockchain.service';

import { Details } from './../../models/details';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private details: Details;

  constructor(public blockchainService: BlockchainService) {
    this.details = {
      marketCap: NaN,
      totalBc: NaN,
      twentyFourHrTransactionCount: NaN,
      twentyFourHrBtcSent: NaN,
      hashRate: NaN,
      getDifficulty: NaN
    };
  }

  ngOnInit() {
    this.blockchainService.getDetails().then((details) => {
      this.details = details;

    }).catch((error) => {
      console.log(error);
    });
  }

}
