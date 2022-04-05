import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/i-product';
import { CartService } from '../../services/cart.service';
import { CompareService } from '../../services/compare.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  items = this.compareService.getItems();

  constructor(private compareService: CompareService,private cartService:CartService,private wishlistService:WishlistService) {}

  ngOnInit(): void {}

  deleteFromCompare(id: string) {
    this.items = this.compareService.deleteFromCompare(id);
  }

  clearCompare() {
    this.items = this.compareService.clearCompare();
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  addToWishlist(product: IProduct) {
    this.wishlistService.addToWishlist(product);
    window.alert('Your product has been added to the Wishlist!');
  }

}
