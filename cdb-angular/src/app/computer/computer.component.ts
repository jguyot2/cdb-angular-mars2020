import { Component, OnInit, Input} from '@angular/core';
import {ComputerService} from '../computer.service';
import{Computer} from '../models/computer.model';
import {CompanyComponent} from '../company/company.component';

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
}