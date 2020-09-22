import {Company} from './company.model';
import { ReactiveFormsModule } from '@angular/forms';

export class Computer{
    id?:number= 0 ;
    name:string= null;
    introduced?:Date= null; 
    discontinued?:Date = null;
    company?:Company = null;    
} 