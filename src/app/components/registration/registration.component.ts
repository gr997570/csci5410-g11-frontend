import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  loginForm: any;

  success: boolean = false;

  boxid: string;

  error: string;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern('^[A-Za-z0-9 ]+$')]],
      email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z0-9!@$&#%*^]+$')]],
      question: ["", Validators.required],
      answer: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.generateBoxid();
  }

  generateBoxid(){
    const boxNumberList = ["BOX0001", "BOX0002","BOX0003", "BOX0004", "BOX0005", "BOX0006", "BOX0007", "BOX0008", "BOX0009", "BOX0010"];
    const random = Math.floor(Math.random() * boxNumberList.length);
    this.boxid = boxNumberList[random];
  }

  onSubmit() {
    let user = {
                  name: this.loginForm.controls['name'].value,
                  email: this.loginForm.controls['email'].value,
                  password: this.loginForm.controls['password'].value,
                  boxid: this.boxid,
                  question: this.loginForm.controls['question'].value,
                  answer: this.loginForm.controls['answer'].value
                }
    this.http.post("https://us-central1-csci5410-334019.cloudfunctions.net/user/register", user).subscribe((result:any)=>{
      if(result.success){
        this.success = true;
        alert("Registration Successful")
      }
      else{
        this.success = false;
      }
    },(error: any) => {
      this.error = error.error.message;
      this.loginForm.controls['email'].setErrors({duplicate: true});
    });
  }

  redirectLogin(){
    this.router.navigate(['/login']);
  }

}
