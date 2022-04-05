import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  items = this.cartService.getItems();
  

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  deleteFromCart(id: string) {
    this.items = this.cartService.deleteFromCart(id);
  }

  clearCart() {
    this.items = this.cartService.clearCart();
  }
}
