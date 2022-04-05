import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../models/i-product';
import { CartService } from '../../services/cart.service';
import { CompareService } from '../../services/compare.service';
import { ProductsService } from '../../services/products.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productListOfCategory: IProduct[];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private compareService: CompareService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   if (params['category']) {
    //     this.productsService
    //       .getAllProductsByCategoryId(params['category'])
    //       .subscribe((products) => (this.productListOfCategory = products));
    //   } else
    //    if (params['name']) {
    //     this.productsService
    //       .getProductsBySearch(params['name'])
    //       .subscribe((products) => (this.productListOfCategory = products));
    //   } else {
    //     this.productsService
    //       .getAllProducts()
    //       .subscribe((products) => (this.productListOfCategory = products));
    //   }
    // });

    this.productsService
          .getAllProducts()
          .subscribe((products) => {
            
            this.productListOfCategory = products.data;            
          });

          console.log(this.productListOfCategory);
          


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
