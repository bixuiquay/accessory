import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPermissionsModule } from 'ngx-permissions';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientRoutingModule } from './client-routing.module';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LoginFormFactory } from './login-register/login.form';
import { ClientGuard } from './services/guard/client.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientRoutingModule
  ],
  declarations: [
    ClientInfoComponent,
    LoginRegisterComponent
  ],
  providers: [
    ClientGuard,
    LoginFormFactory
  ]
})
export class ClientModule {}
