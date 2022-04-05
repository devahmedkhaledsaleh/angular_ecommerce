import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  userToken:string | null = this.authenticationService.getToken()
  userInfo: any;
  orderValue: {};
  productsId: object[] = [];

  isValidFormSubmitted = false;

  orderForm: FormGroup;
  fname: FormControl;
  lname: FormControl;
  email: FormControl;
  phone: FormControl;
  address: FormControl;
  city: FormControl;
  postcode: FormControl;
  note: FormControl;
  userId: FormControl;
  totalPrice: FormControl;
  token: FormControl;

  // initFormControl() {
  //   this.fname = new FormControl(this.userInfo.fname, [Validators.required]);
  //   this.lname = new FormControl(this.userInfo.lname, [Validators.required]);
  //   this.email = new FormControl(this.userInfo.email, [Validators.required]);
  //   this.phone = new FormControl(this.userInfo.phone, [Validators.required]);
  //   this.address = new FormControl(this.userInfo.address, [Validators.required]);
  //   this.city = new FormControl(this.userInfo.city, [Validators.required]);
  //   this.postcode = new FormControl(this.userInfo.postcode, [Validators.required]);
  //   this.note = new FormControl(this.userInfo.note, [Validators.required]);
  //   this.userId = new FormControl(this.userInfo.id, [Validators.required]);
  //   this.orderPrice = new FormControl(this.userInfo.orderPrice, [Validators.required]);
  // }

  initFormControl() {
    this.fname = new FormControl(this.userInfo.fname, [Validators.required]);
    this.lname = new FormControl(this.userInfo.lname, [Validators.required]);
    this.email = new FormControl(this.userInfo.email, [Validators.required]);
    this.phone = new FormControl(this.userInfo.phone, [Validators.required]);
    this.address = new FormControl(this.userInfo.address, [Validators.required]);
    this.city = new FormControl(this.userInfo.city, [Validators.required]);
    this.postcode = new FormControl(this.userInfo.postcode, [Validators.required]);
    this.note = new FormControl(this.userInfo.note, [Validators.required]);
    this.userId = new FormControl(this.userInfo.id, [Validators.required]);
    this.totalPrice = new FormControl(this.getTotalPrice(), [Validators.required]);
    this.token = new FormControl(this.userToken, [Validators.required]);
  }

  createForm() {
    this.orderForm = new FormGroup({
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      phone: this.phone,
      address: this.address,
      city: this.city,
      postcode: this.postcode,
      note: this.note,
      userId: this.userId,
      totalPrice: this.totalPrice,
      token: this.token,
    });
  }

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private authenticationService:AuthenticationService
  ) {
   
  }

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(this.userInfo);    
    this.initFormControl();
    this.createForm();
    
  }

  items = this.cartService.getItems();

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  onSubmit() {
    this.isValidFormSubmitted = false;
    if (this.orderForm.invalid) {
      
      
      return;
    }

    this.isValidFormSubmitted = true;
    const observer = {
      next: (res: object) => {
        alert('Order Successfult');
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      error: (err: Error) => console.log(err.message),
    };

    this.items.forEach((item) => {
      this.productsId.push({
        productId: item._id,
        productQuantity: item.quantity,
      });
    });

    this.orderValue = {
      totalPrice: this.getTotalPrice(),
      products: this.productsId,
      token: this.userToken
    };

    // this.orderForm.value.products = this.items;
    // this.orderForm.value.totalPrice = this.getTotalPrice();
    // this.orderForm.value.userId = "2274";

    console.log(this.orderValue);
    

    this.orderService.addOrder(this.orderValue).subscribe(observer);

    console.log("Done");
    
  }
}
