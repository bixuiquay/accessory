import { Component, OnInit } from '@angular/core';
import { Category, CategoryFacade } from 'src/+state/category';
declare var $: any;
$(document).ready(function() {
  
});

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  categories: Category[];

  constructor(
    private categoryFacade: CategoryFacade

  ) { }

  ngOnInit() {
    this.categoryFacade.categories$.subscribe(data => {
      console.log('data: ', data);
      this.categories = data;
    })
  }

}
