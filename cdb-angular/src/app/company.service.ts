import { Injectable } from '@angular/core';
import{Company} from './models/company.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl: string = 'http://localhost:8080/webapp/';
  private urlCompanies: string = this.baseUrl + "companies/";

  constructor(private http: HttpClient) { }

  getCompanyList(): Observable<Company[]> {
     var result = this.http.get<Company[]>(this.urlCompanies);
    console.log(result);
      return this.http.get<Company[]>(this.urlCompanies);
  }
}
