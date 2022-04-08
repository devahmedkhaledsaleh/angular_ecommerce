import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authenticationLoginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  initFormControl() {
    this.email = new FormControl('');
    this.password = new FormControl('');
  }

  createForm() {
    this.authenticationLoginForm = new FormGroup({
      email: this.email, 
      password: this.password, 
    });
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.initFormControl();
    this.createForm();
  }

  ngOnInit(): void {
  }

  errorMeg: string;

  onSubmit() {
    const observer = {
      next: (res: any) => {
        localStorage.setItem('userInfo', JSON.stringify(res));
        localStorage.setItem('userToken', res.token);
        this.router.navigate(['']);
        
      },
      error: (err:any) => this.errorMeg = err.error.message,  
      
    };

    this.authenticationService
      .userLogin(this.authenticationLoginForm.value)
      .subscribe(observer);
  }
}
