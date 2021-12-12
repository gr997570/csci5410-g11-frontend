import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private dataservice: DataserviceService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    this.chatForm = this.fb.group({
      user: [""],
      chatmessage: ["", Validators.required]
    });
    this.uploadForm = this.fb.group({
       fileupload: [""]
    })
    this.getUsers()
    this.getMessages();
  }

  ngOnInit() {
    //this.getUsers()
  }

  users = []
  messages = []
  selectedUser: string;
  isUploadValid = false;
  user = this.dataservice.loggedInUser.data;

  chatForm: any;
  uploadForm: any;

  getUsers(){
    let user = {
      email: this.user.email,
      boxnumber: this.user.boxid
    }
    this.http.get("https://us-central1-csci5410-334019.cloudfunctions.net/chat/chat/"+user.email+"/"+user.boxnumber).subscribe((result:any)=>{
      if(result.status){
        this.users = result.data;
        console.log(this.users);
      }
    });
  }

  getMessages(){
    let user = {
      email: this.user.email,
      subscription: this.user.boxid+this.user.boxuserid
    }
    this.http.post("https://us-central1-csci5410-334019.cloudfunctions.net/chat", user).subscribe((result:any)=>{
      if(result.status){
        this.messages.push(result.data)
      }
    });
  }

  onSubmit(){
    const sender = this.user.name;
    const receiver = this.chatForm.controls['user'].value;
    let message = {
      chatmessage: this.chatForm.controls['chatmessage'].value,
      subscription: this.user.boxid+this.user.boxuserid,
      sender: this.user.email,
      receiver: this.chatForm.controls['user'].value,
    }
    this.http.post("https://us-central1-csci5410-334019.cloudfunctions.net/chat/chats/", message).subscribe((result:any)=>{
      if(result.status){
        console.log(result);
        alert("Message sent!")
      }
      else{
        alert("Failed to send message!")
      }
    });
  }

  selectedFiles?: FileList;
  currentFile?: File;
  message = '';

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
        const formData: FormData = new FormData();
        console.log(this.currentFile)
        formData.append('file', this.currentFile);
        formData.append('sender', this.user.email)
        this.http.post("https://csci5410-g11.herokuapp.com/upload", formData).subscribe((result:any)=>{
          if(!result.status){
            this.isUploadValid = false;
          }
          else{
            this.isUploadValid = true;
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }

}
