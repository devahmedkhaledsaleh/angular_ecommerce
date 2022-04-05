import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '../../models/i-category';
import { IProduct } from '../../models/i-product';
import { CartService } from '../../user/services/cart.service';
import { CategoriesService } from '../../user/services/categories.service';
import { CompareService } from '../../user/services/compare.service';
import { ProductsService } from '../../user/services/products.service';
import { WishlistService } from '../../user/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productListOfCategory: IProduct[];
  data:any = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private compareService: CompareService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((products) => {      
      this.productListOfCategory = products.data;
    });
    
    
  }

  openProductDetails(productId: string) {
    this.router.navigate(['/products', productId]);
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
}
