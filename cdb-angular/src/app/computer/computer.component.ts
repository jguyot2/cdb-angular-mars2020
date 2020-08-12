import { Component, OnInit, Input, AfterContentInit} from '@angular/core';
import {ComputerService} from '../computer.service';
import{Computer} from '../models/computer.model';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {

  constructor(private service:ComputerService) { }
 
  ngOnInit(): void {
  }

  @Input()
  computer : Computer;

  hasCompany: boolean = false;

  ngAfterContentInit(){
    this.hasCompany = this.computer.companyDTO != null;
  }
}