import { Component, OnInit, Input } from '@angular/core';
import {Company} from '../models/company.model';

@Component({
  selector: 'app-company-display',
  templateUrl: './company-display.component.html',
  styleUrls: ['./company-display.component.scss']
})
export class CompanyDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  company : Company;
}
