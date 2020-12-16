import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {
  userDetails: any;

  constructor(private forgotPassService: RegisterService,private alert: AlertService,private router: Router) { }

  ngOnInit(): void {
  }
  token: boolean = false;
  button: string = "Enter"

  forget(passwordForm: NgForm) {
    console.log(passwordForm.value, "enter");
    if (this.button === "Enter") {

      this.forgotPassService.forgetPaaaword(passwordForm.value.email).subscribe(res => {
        if(res['error']===undefined){
        this.token = true;
        this.button = "Reset";
        this.userDetails = res;}
     }, err => {
        console.log(err);
      })

    } else {
      console.log(this.userDetails);
      
      this.forgotPassService.updatePassword(this.userDetails._id, passwordForm.value).subscribe(res => {
        this.alert.showSuccess('Password Changed Succesfully!!!')
        this.router.navigate(['/merchant/login'])
      })
    }
  }
}