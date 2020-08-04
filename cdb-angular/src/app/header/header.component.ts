import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private as:AuthenticationService , private router:Router) { }

  ngOnInit(): void {
  }


  logout(){
    this.as.logout();
    this.router.navigate(['/login']);
  }
  getUsername(){
    return this.as.getName();
  }
}
