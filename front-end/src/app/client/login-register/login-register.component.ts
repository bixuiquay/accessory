import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from 'ngx-strongly-typed-forms';
import { Observable, combineLatest } from "rxjs";

import { AuthenticationFacade, LoginModel } from 'src/+state/authentication';
import { LoginFormFactory } from './login.form';

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.css"],
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup<LoginModel> = this.createForm();
  constructor(
    private route: ActivatedRoute,
    private formFactory: LoginFormFactory,
    private autFacade: AuthenticationFacade,
    private router: Router,
  ) {}
  ngOnInit() {}

  /**
   * Create a form
   *
   * @return {FormGroup<LoginModel>}
   */
  private createForm(): FormGroup<LoginModel> {
    return this.formFactory.create({
      email: '',
      password:''
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
}
