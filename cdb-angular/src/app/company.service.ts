import { Injectable } from '@angular/core';
import{Company} from './models/company.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from './urls';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyList(): Observable<Company[]> {
      return this.http.get<Company[]>(Urls.companiesUrl);
  }
}
