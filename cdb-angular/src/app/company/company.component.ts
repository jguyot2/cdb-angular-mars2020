import { Component, OnInit, Input } from '@angular/core';
import {Company} from '../models/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  } 

  @Input() 
  company : Company;
}
