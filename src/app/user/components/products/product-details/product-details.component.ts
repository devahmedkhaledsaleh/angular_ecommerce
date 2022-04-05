import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../../models/i-product';
import { CartService } from '../../../services/cart.service';
import { CompareService } from '../../../services/compare.service';
import { ProductsService } from '../../../services/products.service';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  currentId: any;
  currentProduct: IProduct | null | any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location,
    private cartService: CartService,
    private wishlistService:WishlistService,
    private compareService:CompareService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((arg) => {
      this.currentId = arg.get('id');
      this.productsService
        .getProductById(this.currentId)
        .subscribe((product) => {
          this.currentProduct = product;
        });



        
    });
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  addToWishlist(product: IProduct) {
    this.wishlistService.addToWishlist(product);
    window.alert('Your product has been added to the Wishlist!');
  }

  addToCompare(product: IProduct) {
    this.compareService.addToCompare(product);
    window.alert('Your product has been added to the Compare!');
  }

  goBack() {
    this.location.back();
  }
}
