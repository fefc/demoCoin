import { Component, OnInit } from '@angular/core';

import { ProfileService } from './../../services/profile/profile.service';

@Component({
  selector: 'app-my-coins',
  templateUrl: './my-coins.page.html',
  styleUrls: ['./my-coins.page.scss'],
})
export class MyCoinsPage implements OnInit {

  private myCoinsAmount: number;

  constructor(public profileService: ProfileService) {
    this.myCoinsAmount = this.profileService.getMyCoinsAmount();
  }

  ngOnInit() {

  }
}
