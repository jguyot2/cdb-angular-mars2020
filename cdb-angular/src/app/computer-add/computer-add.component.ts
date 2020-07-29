import { Component, OnInit, Input } from '@angular/core';

import { ComputerService } from '../computer.service';
import { CompanyService } from '../company.service';

import { Computer } from '../models/computer.model';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-computer-add',
  templateUrl: './computer-add.component.html',
  styleUrls: ['./computer-add.component.scss']
})
export class ComputerAddComponent implements OnInit {

  constructor(private computerService: ComputerService, private companyService: CompanyService) { }

  @Input()
  createdComputer: Computer = new Computer();

  companies: Company[];


  ngOnInit(): void {
    this.companyService.getCompanyList().subscribe(
      (result: Company[]) => {
        this.companies = result;
      },
      (error) => {
        console.log(error);
        this.companies = [];
      })
  }
  control(): boolean {
    return true;
  }
  
  onSubmit() {
    this.computerService.addComputer(this.createdComputer).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      });
  }
}
