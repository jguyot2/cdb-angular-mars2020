import { Component, OnInit, Input } from '@angular/core';
import { ComputerService } from '../computer.service';
import { CompanyService } from '../company.service';
import { Computer } from '../models/computer.model';
import { Company } from '../models/company.model';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UnderbodyComponent } from '../underbody/underbody.component';

@Component({
  selector: 'app-computer-add',
  templateUrl: './computer-add.component.html',
  styleUrls: ['./computer-add.component.scss']
})
export class ComputerAddComponent implements OnInit {

  constructor(private computerService: ComputerService,
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<UnderbodyComponent>,
    private router: Router) {
  }
  @Input()
  createdComputer: Computer = new Computer();

  companies: Company[];


  onNoClick(): void {
    this.dialogRef.close();
  }
  lowerThresoldDate: number = new Date(1970, 1, 1).getTime();
  upperThresoldDate: number = new Date(2038, 1, 1).getTime();

  get name() { return this.computerForm.get('name'); }
  get introduced() { return this.computerForm.get('introduced'); }
  get discontinued() { return this.computerForm.get('discontinued'); }
  computerForm = null;

  ngOnInit(): void {
    this.companyService.getCompanyList().subscribe(
      (result: Company[]) => {
        this.companies = result;
      },
      (error) => {
        this.companies = [];
      });
    this.computerForm = new FormGroup({
      'name': new FormControl(this.createdComputer.name || '', [
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
      'introduced': new FormControl(this.createdComputer.introduced, [
        (control: AbstractControl) => {
          const introducedStr = control.value;
          if (!introducedStr || introducedStr === "")
            return null;
          const introduced = new Date(control.value);

          if (introduced.getTime() < this.lowerThresoldDate
            || introduced.getTime() > this.upperThresoldDate) {
            return { 'outOfRange': true };
          }
          return null;
        }]
      ),
      'discontinued': new FormControl(this.createdComputer.discontinued, [
        (control: AbstractControl) => {
          const strDiscontinued = control.value;
          if (!strDiscontinued)
            return null;

          const discontinued = new Date(strDiscontinued);

          if (discontinued.getTime() < this.lowerThresoldDate
            || discontinued.getTime() > this.upperThresoldDate)
            return { 'outOfRange': true };

          return null;
        }]
      ),
      'company': new FormControl(null)
    }, {
      validators: [
        // Vérification de la cohérence des dates entre elles 
        (control: FormGroup): ValidationErrors | null => {
          const intro = control.get('introduced');
          const disco = control.get('discontinued');


          const introDate: Date = intro.value ? new Date(intro.value) : null;
          const discoDate: Date = disco.value ? new Date(disco.value) : null;

          if (introDate) {
            if (discoDate) {
              return introDate.getTime() < discoDate.getTime() ? null :
                { discoBeforeIntro: true };
            }
          } else {
            return discoDate ? { discoWithoutIntro: true } : null;
          }
        }
      ]
    });

  }
  onSubmit() {
    if (this.computerForm.invalid) // Affichage de message ? 
      return;
    const computer: Computer = new Computer();
    computer.name = this.computerForm.get('name').value;
    console.log(computer.name);

    computer.introduced = this.computerForm.get('introduced').value;
    computer.discontinued = this.computerForm.get('discontinued').value;

    computer.company = this.computerForm.get('company').value;
    this.computerService.addComputer(computer).subscribe(
      (result) => {
        console.log("added");
        console.log(result);
      },
      (error) => {
        console.log("not added");
        console.log(error);
      });

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}