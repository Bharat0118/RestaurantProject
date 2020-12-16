import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css']
})
export class FoodItemsComponent implements OnInit {
  cartItems: any;
  loader: boolean = true
  allCart: any;
  allCartItems: any;
  checkquantity: any;
  quant: any;
  userLocal: any;
 
  constructor(private http: HttpClient,
    private cartService: RegisterService,
    private alertService: AlertService
  ) { }
  @Input() foodCategory;
  dishes: any;

  async ngOnInit() {
    await this.http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${this.foodCategory}&maxFat=25&apiKey=f2a80c9b1c704294a2adf9ce3f3460c8`)
      .subscribe(items => {
        this.loader = false
        this.dishes = items['results'];
      })
      this.userLocal=this.cartService.getDatafromLocal();
  }

  getCartItems() {
    this.cartService.getToCart(this.userLocal[0]._id).subscribe(response => {
      this.allCartItems = response
    })
  }

  addToCart(id) {
    this.getCartItems();
    setTimeout(() => {
      this.cartItems = this.dishes.filter(resp => resp.id === id)
      this.checkquantity = this.allCartItems.filter(res => res._id == id)

      if (this.checkquantity.length !== 0) {
        this.quant = { quantity: this.checkquantity[0].quantity + 1 }
        if (this.quant.quantity <= 3) {
          this.cartService.updateQuantity(this.checkquantity[0]._id ,this.userLocal[0]._id, this.quant).subscribe(respe => {
            this.alertService.showError('Item already available in cart, quantity increased')
          })
        }
        else {
          this.alertService.showError(`${this.quant.quantity} quantity is not availabe`)
        }
      }
      else{
        this.allCart = {
          id: this.cartItems[0].id,
          user_id:this.userLocal[0]._id,
          title: this.cartItems[0].title,
          image: this.cartItems[0].image,
          amount: this.cartItems[0].nutrition['nutrients'][0].amount,
          quantity: 1
        }
        this.cartService.addToCart(this.allCart).subscribe(res => {
        this.alertService.showSuccess(`${res['title']} is added to cart`)
        })
      }
    }, 1000);
  }
}