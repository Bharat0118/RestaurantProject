import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public checkService:AlertService,private router:Router) { }

  ngOnInit(): void {
  }
  isLogOut(){
    if(confirm('Do you want to logOut???')){
      localStorage.removeItem('user');
      this.checkService.showSuccess('LoggedOut Successfully');
      this.router.navigate(['/'])
    }
    
  }

}
