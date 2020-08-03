import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private as:AuthenticationService ) { }

  ngOnInit(): void {
  }


  logout(){
    this.as.logout();
  }
}
