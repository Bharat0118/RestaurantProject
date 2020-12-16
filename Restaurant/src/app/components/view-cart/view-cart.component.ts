import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterService } from 'src/app/services/register.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  cartItems: any;
  total: number;
  allPrice: string;
  subtotal: number;
  itemIncart: boolean = false;
  localUser: any;

  constructor(private cartSerevice: RegisterService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.localUser=this.cartSerevice.getDatafromLocal()
    await this.cartSerevice.getToCart(this.localUser[0]._id).subscribe(items => {
      this.cartItems = items;
      if (this.cartItems.length === 0) {
        this.itemIncart = true;
      } else {
        this.itemIncart = false
      }
    })
    
    setTimeout(() => {
      this.total = parseFloat(this.totalPrice());
      this.subtotal = this.total + 10;
    }, 1000);
  }
  
  totalPrice() {
    this.total = 0;
    this.cartItems.forEach(allCartItems => {
      this.total = this.total + (allCartItems.price * allCartItems.quantity);
      this.allPrice = this.total.toFixed(2)
    })
    return this.allPrice
  }
  
  openDialog() {
    let dialogRef = this.dialog.open(CheckoutComponent, {
      data: { total: this.subtotal },
      height: '500px',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  delete(id) {
    this.cartSerevice.removeItem(id).subscribe(resp => {
      this.ngOnInit()
    })
  }
}