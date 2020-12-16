import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  userDetails: any;
  user: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    this.user=this.userDetails['user'];
  }

  dialougeBox() {
    alert('Order Sucess!!!!');
    this.router.navigate(['/home'])
    this.dialog.closeAll();
 
  }
}
