import { Injectable } from '@angular/core';
import { IProduct } from '../../models/i-product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  items: IProduct[] = [];
  wishlist: any;
  keepGoing:boolean = true;
  constructor() {
  }

  addToWishlist(product: IProduct) {
    if (localStorage.getItem('wishlist')) {
      this.wishlist = localStorage.getItem('wishlist');
      this.items = JSON.parse(this.wishlist);
      if (!this.items.find((item) => item._id === product._id)) {
        this.items.push(product);
      }
      
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    } else {
      this.items = [];
      this.items.push(product);
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    }
  }

  countWishlistNumber() {
    this.wishlist = localStorage.getItem('wishlist');
    this.items = JSON.parse(this.wishlist);
    if(this.items) {
      return this.items.length;
    } else {
      return 0
    }
  }

  getItems() {
    this.wishlist = localStorage.getItem('wishlist');
    this.items = JSON.parse(this.wishlist);
    return this.items;
  }

  deleteFromWishlist(id:string) {
    this.keepGoing = true;
    this.wishlist = localStorage.getItem('wishlist');
    this.items =  JSON.parse(this.wishlist);
    this.items.forEach((item,index)=>{
      if(this.keepGoing) {
      if(item._id==id) this.items.splice(index,1);
      }
   });
   localStorage.removeItem("wishlist");
   localStorage.setItem('wishlist', JSON.stringify(this.items));
    return this.items;
  }

  clearWishlist() {
    localStorage.removeItem("wishlist");
    this.items = [];
    return this.items;
  }
}
