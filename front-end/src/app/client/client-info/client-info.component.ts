// TODO: Feature Componetized like CrisisCenter
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationFacade } from 'src/+state/authentication/authentication.facade';
import { CartProductFacade } from 'src/+state/cart-product/cart-product.facade';
import { InvoiceFacade } from 'src/+state/invoice/invoice.facade';
import { AuthService } from 'src/core/src';

@Component({
  selector: "app-client-info",
  templateUrl: "./client-info.component.html",
  styleUrls: ["./client-info.component.css"],
})
export class ClientInfoComponent implements OnInit {
  invoices$ = this.invoiceFacade.invoices$;
  userInfo;

  constructor(
    private cartProductFacade: CartProductFacade,
    private invoiceFacade: InvoiceFacade,
    private authService: AuthService,
    private route: ActivatedRoute,
    private authenticationFacade: AuthenticationFacade
    ) {}

  ngOnInit() {
    this.cartProductFacade.getCartInfo().subscribe();
    this.invoiceFacade.getMine({page: 1, limit: 20}).subscribe(data => {
    });

    this.authenticationFacade.getClientProfile().subscribe(data => {
      this.userInfo = data;
    })
  }
}
