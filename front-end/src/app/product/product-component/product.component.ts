import { AfterContentInit, Component, OnInit } from "@angular/core";
import { CartProduct } from "src/+state/cart-product/cart-product..model";
import { CartProductFacade } from "src/+state/cart-product/cart-product.facade";
import { Category, CategoryFacade } from 'src/+state/category';
import { AuthService } from "src/core/src";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit, AfterContentInit {
  categories: Category[];
  cart$ = this.cartProductFacade.cartProducts$;

  constructor(
    private categoryFacade: CategoryFacade,
    private cartProductFacade: CartProductFacade,
    private authService: AuthService

  ) { }

  ngAfterContentInit(): void {
    //check local storage
  }

  ngOnInit() {
    this.categoryFacade.getAll().subscribe(data => {
      this.categories = data;
      const nodes = [
        'assets/js/jquery.min.js',
        'assets/js/tether.min.js',
        'assets/js/bootstrap.min.js',
        'assets/js/bootstrap-hover-dropdown.min.js',
        'assets/js/owl.carousel.min.js',
        'assets/js/echo.min.js',
        'assets/js/wow.min.js',
        'assets/js/jquery.easing.min.js',
        'assets/js/jquery.waypoints.min.js',
        'assets/js/electro.js',
      ].forEach(x => {
        const node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = x;
        node.crossOrigin = 'anonymous'
        document.body.appendChild(node);
      });
    });

    if (this.authService.cart) {
      this.cartProductFacade.getCartInfo().subscribe();
    }
  }

  removeItem(p: CartProduct) {
    this.cartProductFacade.deleteCartProduct(p.product.id).subscribe();
  }
}