import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  details: any;

  constructor(private myServie: RegisterService,
    private toastr: AlertService,
    private router: Router) { }

  ngOnInit(): void {
  }
  login(myForm: NgForm) {
    this.myServie.getDtataByEmail(myForm.value).subscribe(resp => {
      localStorage.setItem('user', JSON.stringify(resp))
      this.toastr.showSuccess(resp['message'])
      this.router.navigate(['/merchant/food-items'])
    },
      err => {console.log(err);
      
        this.toastr.showError(err['error'].message)

      })

  }
}
