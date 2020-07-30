import { Component, OnInit, Input } from '@angular/core';

import { ComputerService } from '../computer.service';
import { CompanyService } from '../company.service';

import { Computer } from '../models/computer.model';
import { Company } from '../models/company.model';
import { Problems } from '../models/computer.problems';

import {FormControl, Validators} from '@angular/forms';

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

  problems: Problems[] = [];

  nameFormControl=new FormControl('', [Validators.required]);
  

  // TODO : i18n de la validation

  getIntroducedProblemMessage(): string {
    if (this.problems.includes(Problems.DISCONTINED_BEFORE_INTRODUCED)) {
      return "The discontinuation date must be set after the introduced date";
    } else if (this.problems.includes(Problems.INVALID_INTRODUCED_RANGE)) {
      return "The date must be between 1970 and 2037";
    } else if (this.problems.includes(Problems.DISCONTINED_SET_WITHOUT_INTRODUCED)) {
      return "The introduction date must be set if the discontinuation date is set";
    }
    return null;
  }
  getDiscontinuedProblemMessage(): string {
    if (this.problems.includes(Problems.INVALID_DISCONTINUED_RANGE)) {
      return "The date must be between 1970 and 2037";

    }
  }
  getNameProblemMessage(): string {
    if (this.problems.includes(Problems.INVALID_NAME)) {
      return "The name must not be empty";
    }
    return null;
  }

  updateProblems(): void {
    const name: string = this.createdComputer.computerName;
    const introduced: Date = this.createdComputer.introducedDate;
    const discontinued: Date = this.createdComputer.discontinuedDate;
    const company: Company = this.createdComputer.companyDTO;
    this.problems = [];

    if ((!name) || name === "") {
      this.problems.push(Problems.INVALID_NAME);
    }

    if (introduced) {
      if (introduced.getFullYear() < 1970 || introduced.getFullYear() > 2037) {
        this.problems.push(Problems.INVALID_INTRODUCED_RANGE);
      }
      if (discontinued) {
        if (discontinued.getFullYear() < 1970 || discontinued.getFullYear() > 2037) {
          this.problems.push(Problems.INVALID_DISCONTINUED_RANGE);
        }
        if (discontinued < introduced) {
          this.problems.push(Problems.DISCONTINED_BEFORE_INTRODUCED);
        }
      }
    } else {
      if (discontinued) {
        if (discontinued.getFullYear() < 1970 || discontinued.getFullYear() > 2037) {
          this.problems.push(Problems.INVALID_DISCONTINUED_RANGE);
        }
        this.problems.push(Problems.DISCONTINED_SET_WITHOUT_INTRODUCED);
      }
    }
  }

  isValidComputer() {
    this.updateProblems(); // ?
    return this.problems.length === 0;
  }

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
