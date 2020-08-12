import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service'
import { Router } from '@angular/router';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private as:AuthenticationService , private router:Router) { }

  ngOnInit(): void {
  }

  get hidden(): boolean {
    console.log(!this.as.isLoggedIn())
    return !this.as.isLoggedIn()
  }

  logout(){
    this.as.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }
  getUsername(){
    return this.as.getName();
  }
}
