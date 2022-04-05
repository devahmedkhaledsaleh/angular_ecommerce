import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  userOrders: any;

  constructor(
    private orderService: OrderService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const token = this.authenticationService.getToken();

    if (token) {
      this.orderService.getOrdersByUserId(token).subscribe((orders) => {
        this.userOrders = orders;
      });

      console.log(this.userOrders);
    }
  }
}
