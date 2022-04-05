import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../models/i-product';
import { CartService } from '../../services/cart.service';
import { CompareService } from '../../services/compare.service';
import { ProductsService } from '../../services/products.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
})
export class CategoryProductsComponent implements OnInit {
  productListOfCategory: IProduct[];
  categoryName: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private compareService: CompareService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((arg) => {
      this.categoryName = arg.get('categoryName');

      this.productsService
        .getAllProductsByCategoryName(this.categoryName)
        .subscribe((product) => {
          
           this.productListOfCategory = product.data;
        });
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
