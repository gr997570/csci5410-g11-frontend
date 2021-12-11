import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-second-factor',
  templateUrl: './second-factor.component.html',
  styleUrls: ['./second-factor.component.css']
})
export class SecondFactorComponent implements OnInit {

  loginForm: any;

  constructor(private dataservice: DataserviceService, private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      question: ["", Validators.required],
      answer: ["", Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    let user = {
                  email: this.dataservice.loggedInUser.data.email,
                  question: this.loginForm.controls['question'].value,
                  answer: this.loginForm.controls['answer'].value
                }
    this.http.post("https://us-central1-csci5410-334019.cloudfunctions.net/user/secondfactor", user).subscribe((result:any)=>{
      if(result.success){
        this.router.navigate(['/thirdfactor'])
      }
    }, (error: any) => {
      this.loginForm.controls['answer'].setErrors({invalid: true})
    });
  }

}
