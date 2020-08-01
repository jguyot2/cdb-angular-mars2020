import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'
import { Observable } from 'rxjs';
import { Authentication } from '../models/authentication.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  onError(error){
    console.log
  }

  constructor(private service:AuthenticationService) { }

  username : FormControl = new FormControl('');

  password : FormControl = new FormControl('');

  ngOnInit(): void {
  }

  login(){
    this.service.login(this.username.value, this.password.value);
  }

}
