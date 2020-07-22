import { Component, OnInit, Input} from '@angular/core';
import {ComputerService} from '../computer.service';
import{Computer} from '../models/computer.model';
import {CompanyDisplayComponent} from '../company-display/company-display.component';

@Component({
  selector: 'app-computer-display',
  templateUrl: './computer-display.component.html',
  styleUrls: ['./computer-display.component.scss']
})
export class ComputerDisplayComponent implements OnInit {

  constructor(private service:ComputerService) { }
 
  ngOnInit(): void {
  }

  @Input()
  computer : Computer;
}