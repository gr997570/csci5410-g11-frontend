import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  success: boolean = false;

  data: any;

  user: string;

  constructor(private dataservice: DataserviceService, private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z0-9!@$&#%*^]+$')]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    let user = {
                  email: this.loginForm.controls['email'].value,
                  password: this.loginForm.controls['password'].value,
                }
    this.http.post("https://us-central1-csci5410-334019.cloudfunctions.net/user/login", user).subscribe((result:any)=>{
      if(result.status){
        this.success = true;
        this.dataservice.setLoggedInUser(result)
        this.router.navigate(['/secondfactor'])
      }
    }, (error: any)=>{
      this.loginForm.controls['email'].setErrors({incorrect: true})
      this.loginForm.controls['password'].setErrors({incorrect: true})
    });
  }

  redirectSignup(){
    this.router.navigate(['/signup']);
  }

}
