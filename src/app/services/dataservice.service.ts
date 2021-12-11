import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  loggedInUser: any

  constructor(private router: Router) { }

  setLoggedInUser(obj: any){
    this.loggedInUser = obj;
  }
}
