import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from 'ngx-strongly-typed-forms';
import { Observable, combineLatest } from "rxjs";

import { AuthenticationFacade, LoginModel, RegisterModel } from 'src/+state/authentication';
import { LoginFormFactory } from './login.form';
import { RegisterFormFactory } from './register.form';

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.css"],
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup<LoginModel> = this.createLoginForm();
  registerForm: FormGroup<RegisterModel> = this.createRegisterForm();
  constructor(
    private route: ActivatedRoute,
    private loginFormFactory: LoginFormFactory,
    private autFacade: AuthenticationFacade,
    private router: Router,
    private registerFormFactory: RegisterFormFactory
  ) {}
  ngOnInit() {}

  /**
   * Create a form
   *
   * @return {FormGroup<LoginModel>}
   */
  private createLoginForm(): FormGroup<LoginModel> {
    return this.loginFormFactory.create({
      email: '',
      password:''
    });
  }

  createRegisterForm() {
    return this.registerFormFactory.create({
      email: '',
      password:'',
      retryPassword:''
    });
  }

  submitLogin(){
    const dto = this.loginForm.value;
    this.autFacade.login(dto).subscribe(data => {
      if (data) {
        this.router.navigateByUrl('user/profile');
      }
    });
  }

  submitRegisterForm() {
    const dto = this.registerForm.value;
    this.autFacade.register(dto).subscribe(data => {
      console.log('data: ', data);
    })
  }

}
