import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodItemsComponent } from '../food-items/food-items.component';

@Component({
  selector: 'app-food-services',
  templateUrl: './food-services.component.html',
  styleUrls: ['./food-services.component.css']
})
export class FoodServicesComponent implements OnInit {
  @ViewChild(FoodItemsComponent) fooditem:FoodItemsComponent
  item: string='ladyfinger';

  constructor() {}

  ngOnInit() {}

 dish(value){
   this.item=value;
  this.fooditem.foodCategory=value;
  setTimeout(() => {
    this.fooditem.ngOnInit()
  }, 1000);

 }

  
}
