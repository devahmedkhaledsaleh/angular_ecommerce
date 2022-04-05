import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {
  userInfo:any;
  constructor() {
    this.userInfo = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(this.userInfo);
   }

  ngOnInit(): void {
  }

}
