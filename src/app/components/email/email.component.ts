import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/services/email.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  showProgress:boolean=false;

  data={
    to:"",
    subject:"",
    message:""
  }
  constructor(private email:EmailService,private snak:MatSnackBar){
  }

  doSubmitForm(){

    if(this.data.to==='' || this.data.subject==='' || this.data.message===''
    ||this.data.to===null || this.data.subject===null || this.data.message===null){
      this.snak.open("fields can't be empty","ok");
      return;
    }
    this.showProgress=true;
    this.email.sendEmail(this.data).subscribe(
      response=>{
        console.log("response");
        this.showProgress=false;
        this.snak.open("email sent successfully","ok")
      },
      error=>{
        console.log(error.error.message);
        this.showProgress=false;
        this.snak.open("Email not sent, server issues","ok")
      }
    )
  }

}
