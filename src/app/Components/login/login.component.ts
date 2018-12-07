import { AccountService } from './../../HTTPServices/account/account.service';
import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/Models/loginModel';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService:AccountService,private router:Router) { }

invalidLogin:boolean=false;
invalidPassword:boolean=false;
  ngOnInit() {

  }
  login(credentials:LoginModel){
    this.accountService.Login(credentials)
      .subscribe(res=>{
        if(res)
        this.router.navigate([""]);
      },error=>{
        this.invalidLogin=true;
      });
  ;
  }
  register(credentials){
    this.accountService.Register(credentials)
    .subscribe(res=>{
      if(res)
      this.router.navigate([""]);
    }
     ,error=>{
      this.invalidPassword=true;
     } ) ;

  }

}
