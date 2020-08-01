import { Component, OnInit, Input } from '@angular/core';
import { ComputerService } from '../computer.service';
import { CompanyService } from '../company.service';
import { Computer } from '../models/computer.model';
import { Company } from '../models/company.model';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

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


  lowerThresoldDate = new Date(1970, 1, 1).getTime();
  upperThresoldDate = new Date(2038, 1, 1).getTime();

  get name() { return this.computerForm.get('name'); }
  get introduced() { return this.computerForm.get('introduced'); }
  get discontinued() { return this.computerForm.get('discontinued'); }

  computerForm = new FormGroup({
    'name': new FormControl(this.createdComputer.computerName || '', [
      Validators.maxLength(200),
      Validators.required,
      (control: AbstractControl) => {
        const name = control.value;

        if (name.trim() === "")
          return { 'onlySpaces': true };
        else
          return null;
      }
    ]),
    'introduced': new FormControl(this.createdComputer.introducedDate, [
      (control: AbstractControl) => {
        const introducedStr = control.value;
        if (!introducedStr || introducedStr === "")
          return null;

        const introduced = new Date(control.value);

        console.log(introduced.getTime());
        console.log(introduced);
        if (introduced.getTime() < this.lowerThresoldDate
          || introduced.getTime() > this.upperThresoldDate) {
          return { 'outOfRange': true };
        }
        return null;
      }]
    ),
    'discontinued': new FormControl(this.createdComputer.discontinuedDate, [
      (control: AbstractControl) => {
        const discontinued = control.value;
        if (!discontinued) return null;
        // cast date ?
        if (discontinued < new Date(1970, 1, 1) || discontinued > new Date(2038, 1, 1))
          return { 'error': { value: control.value } };
        // TODO
        return null;
      }]
    ),
    'company': new FormControl(null)
  }, {
    validators: [
      (control: FormGroup): ValidationErrors | null => {
        const intro = control.get('introduced');
        const disco = control.get('discontinued');

        // CAST ? 
        const introDate = intro ? new Date(intro.value) : null;
        const discoDate = intro ? new Date(disco.value) : null;

        if (intro && !disco) {
          return { 'onlyDisco': true };
        } else {
          return null;
        }
      }
    ]
  });


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

  onSubmit() {
    const computer: Computer = new Computer();
    computer.computerName = this.computerForm.get('name').value;
    console.log(computer.computerName);
    
    computer.introducedDate = this.computerForm.get('introduced').value;
    computer.discontinuedDate = this.computerForm.get('discontinued').value;

    computer.companyDTO = this.computerForm.get('company').value;

    this.computerService.addComputer(computer).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      });
  }

  onClose() {
  }
}