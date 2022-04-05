import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../models/i-category';
import { IProduct } from '../../models/i-product';
import { AuthenticationService } from '../../user/services/authentication.service';
import { CartService } from '../../user/services/cart.service';
import { CategoriesService } from '../../user/services/categories.service';
import { CompareService } from '../../user/services/compare.service';
import { ProductsService } from '../../user/services/products.service';
import { WishlistService } from '../../user/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterContentChecked {
  categoriesList: ICategory[];
  countCartItem: number;
  userInfo: any = "";
  categories: any;
  productName: string = '';

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private compareService: CompareService,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    // if (localStorage.getItem('userInfo')) {
    //   this.userInfo = localStorage.getItem('userInfo');
    //   this.userInfo = JSON.parse(this.userInfo);
    // }
  }

  ngAfterContentChecked(): void {
    if (localStorage.getItem('userInfo')) {
      this.userInfo = localStorage.getItem('userInfo');
      this.userInfo = JSON.parse(this.userInfo);
    }
  }



  getProductByCategory(categoryName:string) {
    this.router.navigate(['/category/products', categoryName]);
  }

  getProductsBySearch() {
    if (this.productName) {
      this.router.navigate(['/products'], {
        queryParams: { name: this.productName },
      });
    }
  }

  countCartItems() {
    return this.cartService.countCartNumber();
  }

  countWishlistItems() {
    return this.wishlistService.countWishlistNumber();
  }

  countCompareItems() {
    return this.compareService.countCompareNumber();
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
  }
}
