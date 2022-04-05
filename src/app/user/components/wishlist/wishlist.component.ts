import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/i-product';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  items = this.wishlistService.getItems();

  constructor(private wishlistService: WishlistService,private cartService:CartService) {}

  ngOnInit(): void {}

  deleteFromWishlist(id: string) {
    this.items = this.wishlistService.deleteFromWishlist(id);
  }

  clearWishlist() {
    this.items = this.wishlistService.clearWishlist();
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

}
