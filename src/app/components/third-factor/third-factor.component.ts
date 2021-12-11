import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-third-factor',
  templateUrl: './third-factor.component.html',
  styleUrls: ['./third-factor.component.css']
})
export class ThirdFactorComponent implements OnInit {

  loginForm: any;
  cipherValue: any;
  cipherAnswer: any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      answer: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.http.post("https://us-central1-csci5410-334019.cloudfunctions.net/user/thirdfactor", null).subscribe((result:any)=>{
      if(result.status){
        this.cipherValue = result.data.cipherValue;
        this.cipherAnswer = result.data.cipherAnswer;
      }
      else{
        
      }
    })
  }

  onSubmit() {
    if(this.cipherAnswer === this.loginForm.controls['answer'].value){
      this.router.navigate(['/profile']);
    }
    else{
      //set error
      this.loginForm.controls['answer'].setErrors({invalid: true});
    }
  }
}
