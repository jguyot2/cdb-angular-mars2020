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
    private token: string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNjAyMDExMjY5LCJpYXQiOjE1OTYwMTEyNjl9.2TYbWqHRgtiYTeJ7gUieGVpGx1HHhE3Na7SbAA1jJp-0yuMko0bPlXcoK42zGYqujdack405oOEzacey6fmzPA"

    header: HttpHeaders = new HttpHeaders()
        .append('Authorization', 'Bearer ' + this.token);

    constructor(private http: HttpClient) { }

    getComputerList(): Observable<Computer[]> {
        return this.http.get<Computer[]>(this.urlComputers, { headers: this.header });
    }

    getPaginatedComputerList(page: Page): Observable<Computer[]> {
        return this.http.get<Computer[]>(this.urlComputers + "orderBy/a", {
            params: new HttpParams()
                .set("currentPage", page.currentPage.toString()).set("pageSize", page.pageSize.toString()), headers: this.header
        });
    }

    getNumberComputers(): Observable<number> {
        return this.http.get<number>(this.urlComputers + "number", { headers: this.header });
    }
 
    addComputer(computer: Computer): Observable<Computer> {
        var header: HttpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.token);
        return this.http.post<Computer>(this.urlComputers, (computer), { "headers": header });
    }
} 