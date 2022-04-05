import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  authenticationRegisterForm: FormGroup;
  fname: FormControl;
  lname: FormControl;
  email: FormControl;
  password: FormControl;

  initFormControl() {
    this.fname = new FormControl('');
    this.lname = new FormControl('');
    this.email = new FormControl('');
    this.password = new FormControl('');
  }

  createForm() {
    this.authenticationRegisterForm = new FormGroup({
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      password: this.password,
    });
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initFormControl();
    this.createForm();
  }

  ngOnInit(): void {}

  onSubmit() {
    const observer = {
      next: (res: any) => {
        localStorage.setItem('userInfo', JSON.stringify(res));
        localStorage.setItem('userToken', res.token);
        this.router.navigate(['']);
      },
      error: (err: Error) => console.log(err.message),
    };

    this.authenticationService
      .userRegister(this.authenticationRegisterForm.value)
      .subscribe(observer);
  }
}
