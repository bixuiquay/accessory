import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientInfoComponent } from './client-info/client-info.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ClientGuard } from './services/guard/client.guard';

const userRoutes: Routes = [
  {
    path: "",
    redirectTo: "profile",
    canActivate: [ClientGuard],
  },
  {
    path: "profile",
    component: ClientInfoComponent,
    canActivate: [ClientGuard],
    pathMatch: 'full'
  },
  {
    path: "login-register",
    component: LoginRegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
