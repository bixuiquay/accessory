import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Category, CategoryFacade } from 'src/+state/category';
declare var $:JQueryStatic;
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, AfterContentInit {
  categories: Category[];

  constructor(
    private categoryFacade: CategoryFacade

  ) { }

  ngAfterContentInit(): void {
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
  }

}
