import { Component, OnInit, Input, Inject } from '@angular/core';
import { ComputerService } from '../computer.service';
import { CompanyService } from '../company.service';
import { Computer } from '../models/computer.model';
import { Company } from '../models/company.model';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterLink, Router } from '@angular/router';
import { UnderbodyComponent } from '../underbody/underbody.component';
import{ComputerData} from '../models/computerdata.model'

@Component({
  selector: 'app-computer-edit',
  templateUrl: './computer-edit.component.html',
  styleUrls: ['./computer-edit.component.scss']
})
export class ComputerEditComponent implements OnInit {

  constructor(private computerService: ComputerService,
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<UnderbodyComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: ComputerData) {
    this.editedComputer = data.computer;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editedComputer: Computer = new Computer();

  companies: Company[];

  lowerThresoldDate: number = new Date(1970, 1, 1).getTime();
  upperThresoldDate: number = new Date(2038, 1, 1).getTime();

  get name() { return this.computerForm.get('name'); }
  get introduced() { return this.computerForm.get('introduced'); }
  get discontinued() { return this.computerForm.get('discontinued'); }
  computerForm = null;


  ngOnInit(): void {
    this.companyService.getCompanyList().subscribe(
      (result: Company[]) => {
        this.companies = result.filter((company) => {
          return (!this.editedComputer.companyDTO) || (company.idCompany !== this.editedComputer.companyDTO.idCompany);
        });
      },
      (error) => {
        this.companies = [];
      });
    this.computerForm = new FormGroup({
      'name': new FormControl(this.editedComputer.computerName, [
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
      'id': new FormControl(this.editedComputer.idComputer),
      'introduced': new FormControl(this.editedComputer.introducedDate, [
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
      'discontinued': new FormControl(this.editedComputer.discontinuedDate, [
        (control: AbstractControl) => {
          const strDiscontinued = control.value;
          if (!strDiscontinued)
            return null;

          const discontinued = new Date(strDiscontinued);

          if (discontinued.getTime() < this.lowerThresoldDate
            || discontinued.getTime() > this.upperThresoldDate)
            return { 'outOfRange': true };
          // TODO
          return null;
        }]
      ),
      'company': new FormControl(this.editedComputer.companyDTO),
    }, {
      validators: [
        // Vérification de la cohérence des dates entre elles 
        (control: FormGroup): ValidationErrors | null => {
          const intro = control.get('introduced');
          const disco = control.get('discontinued');

          // CAST ? 
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
    computer.computerName = this.computerForm.get('name').value;

    computer.introducedDate = this.computerForm.get('introduced').value;
    computer.discontinuedDate = this.computerForm.get('discontinued').value;
    computer.idComputer = this.computerForm.get('id').value;
    computer.companyDTO = this.computerForm.get('company').value;
    this.computerService.editComputer(computer).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      });
    this.dialogRef.close();
    console.log("test");
  }
}
