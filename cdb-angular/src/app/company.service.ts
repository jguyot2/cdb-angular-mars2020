import { Injectable } from '@angular/core';
import{Company} from './models/company.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl: string = 'http://10.0.1.220:8080/webapp/';
  private urlCompanies: string = this.baseUrl + "companies/";

  constructor(private http: HttpClient) { }

  getCompanyList(): Observable<Company[]> {
      return this.http.get<Company[]>(this.urlCompanies);
  }
}
