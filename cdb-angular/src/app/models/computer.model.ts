import {Company} from './company.model';
import { ReactiveFormsModule } from '@angular/forms';

export class Computer{
    idComputer?:number= null;
    computerName:string= null;
    introducedDate?:Date= null; 
    discontinuedDate?:Date = null;
    companyDTO?:Company = null;    
} 