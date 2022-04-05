import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userInfo:any;
  constructor() { 
    this.userInfo = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(this.userInfo);
  }

  ngOnInit(): void {
  }

}
