import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showName: any;
  userDetails = [];
  profileId:any

  constructor(public checkService:AlertService,private pS:RegisterService,private router:Router) { }

  ngOnInit(): void {
    this.profileId=this.pS.getDatafromLocal();
  setTimeout(() => {
    this.pS.getUserByid(this.profileId[0]._id).subscribe(resp=>{
    this.userDetails.push(resp)
    })
  }, 1000);
    // this.userDetails = JSON.parse(localStorage.getItem('user'));
    // this.showName=JSON.parse(localStorage.getItem('user'))
  }

}
