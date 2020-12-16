import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup
  edit: any

  constructor(private fb: FormBuilder, private register: RegisterService, private alert: AlertService, private router: Router,
    private act: ActivatedRoute) { }

  ngOnInit(): void {
    this.act.queryParams.subscribe(param => {
      this.edit = param.id;
      if (this.edit) {
        this.getUserById(this.edit)
      }
    })

    this.myForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
      address1: [''],
      password: ['', [Validators.required, this.checkPassword]],
      pin: ['', Validators.required]
    })
  }
  getUserById(id) {
    this.register.getUserByid(id).subscribe(data => {

      this.setForm(data)

    })
  }
  setForm(data) {
    console.log(data._id);
    this.myForm.patchValue({
      fname: data.fname,
      lname: data.lname,
      address: data.address,
      phone: data.phone,
      email: data.email,
      password: data.password,
      state: data.state,
      pin: data.pin

    })
  }
  get form() {
    return this.myForm.controls
  }
  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.myForm.get('password').hasError('required') ? 'Password required (at least eight characters,incluede uppercase and number)' :
      this.myForm.get('password').hasError('requirements') ? 'Password needs to be at least eight characters,include uppercase and number' : '';
  }

  onSubmit(value) {
    this.myForm.reset()
    if (!this.edit) {
      this.register.postData(value).subscribe(resp => {
      this.alert.showSuccess('User Registered Succesfully!!!')
      this.router.navigate(['/merchant/login'])
    },
    err => {
          this.alert.showError(err.error['message'] || JSON.stringify(err['error'].error))
        })
    } 
    else {
      this.register.updateProfile(this.edit, value).subscribe((resp) => {
      })
      this.alert.showSuccess('User Updated Succesful')
      this.router.navigate(['/merchant/profile'])
      
    }
  }
}
