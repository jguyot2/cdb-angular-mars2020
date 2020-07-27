import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from './models/computer.model'
import { Page } from './models/page.model'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
 
@Injectable({ 
    providedIn: 'root'
})
export class ComputerService {
    // URL du serveur à changer
    private baseUrl: string = 'http://localhost:8080/webapp/';
    private urlComputers: string = this.baseUrl + "computers/";

    header: HttpHeaders = new HttpHeaders()
    .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNTk1ODY5NDk0LCJpYXQiOjE1OTU4NjM0OTR9.X7aUIJs9R8e-KxowKQrB3VBS7_0blVupl3NGxD5dERiSMlMla1dqUXcsgSQIK3IVnLxk2qFzplagL36YJhpH9w');

    constructor(private http: HttpClient) { }

    getComputerList(): Observable<Computer[]> {
        return this.http.get<Computer[]>(this.urlComputers,  { headers: this.header });
    }

    getPaginatedComputerList(page: Page): Observable<Computer[]> {
        return this.http.get<Computer[]>(this.urlComputers + "orderBy/a", {params: new HttpParams()
            .set("currentPage", page.currentPage.toString()).set("pageSize", page.pageSize.toString()), headers: this.header});
    }

    getNumberComputers(): Observable<number> {
        return this.http.get<number>(this.urlComputers + "number", {headers: this.header});
    }
 
    addComputer(computer: Computer) {
        return this.http.post(this.urlComputers, computer);
    }
}