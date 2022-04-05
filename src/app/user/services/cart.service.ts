import { Injectable } from '@angular/core';
import { IProduct } from '../../models/i-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: IProduct[] = [];
  cart: any;
  totalPrice: number = 0;
  keepGoing: boolean = true;
  constructor() {}

  addToCart(product: IProduct) {
    if (localStorage.getItem('cart')) {
      this.cart = localStorage.getItem('cart');
      this.items = JSON.parse(this.cart);
      this.items.find((item) => {
        if (item._id === product._id) {
          item.quantity++;
        }
      });
      if (!this.items.find((item) => item._id === product._id)) {
        product.quantity = 1;
        console.log(product.quantity);
        this.items.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(this.items));
    } else {
      this.items = [];
      product.quantity = 1;
      console.log(product);
      this.items.push(product);
      localStorage.setItem('cart', JSON.stringify(this.items));
    }

    this.getTotalPrice();
  }

  countCartNumber() {
    this.cart = localStorage.getItem('cart');
    this.items = JSON.parse(this.cart);
    if (this.items) {
      return this.items.length;
    } else {
      return 0;
    }
  }

  getItems() {
    this.cart = localStorage.getItem('cart');
    this.items = JSON.parse(this.cart);
    return this.items;
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.cart = localStorage.getItem('cart');
    if(this.cart) {

      this.items = JSON.parse(this.cart);
      
      this.items.forEach((item) => {
        this.totalPrice += +item.price * item.quantity;
      });
    }
    

    return this.totalPrice;
  }

  deleteFromCart(id: string) {
    this.keepGoing = true;
    this.cart = localStorage.getItem('cart');
    this.items = JSON.parse(this.cart);

    this.items.forEach((item, index) => {
      if (this.keepGoing) {
        if (item._id == id) {
          this.items.splice(index, 1);
          this.keepGoing = false;
        }
      }
    });
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.getTotalPrice();
    return this.items;
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.items = [];
    this.getTotalPrice();
    return this.items;
  }
}
