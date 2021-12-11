import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private dataservice: DataserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  user = this.dataservice.loggedInUser.data;

  redirectChat(){
    this.router.navigate(['/chat'])
  }

}
