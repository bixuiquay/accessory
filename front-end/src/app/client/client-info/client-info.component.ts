// TODO: Feature Componetized like CrisisCenter
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartProductFacade } from 'src/+state/cart-product/cart-product.facade';

@Component({
  selector: "app-client-info",
  templateUrl: "./client-info.component.html",
  styleUrls: ["./client-info.component.css"],
})
export class ClientInfoComponent implements OnInit {
  constructor(
    private cartProductFacade: CartProductFacade,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.cartProductFacade.getCartInfo().subscribe();
  }
}
