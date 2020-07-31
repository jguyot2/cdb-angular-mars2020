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
    private token: string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNTk2MjY4Mjc0LCJpYXQiOjE1OTYyMDgyNzR9.XylDYWEZYAyw3kne-34G6ntcHv3fOd_lnFT57Cqm7rPRpGe_37UrUnddWIBUWVsSGI9uf6xHAp_jCKVoEOhvrw";

    header: HttpHeaders = new HttpHeaders()
        .append('Authorization', this.token);
    
    constructor(private http: HttpClient) { }

    getComputerList(): Observable<Computer[]> {
        return this.http.get<Computer[]>(this.urlComputers, { headers: this.header });
    }

    getPaginatedComputerList(page: Page): Observable<Computer[]> {
        console.log(page);
        return this.http.get<Computer[]>(this.urlComputers + "page", {
            params: new HttpParams()
                .append("pageSize", page.pageSize.toString())
                .append("currentPage", page.currentPage.toString()),
            headers : this.header
        });
    }

    getNumberComputers(): Observable<number> {
        return this.http.get<number>(this.urlComputers + "number", { headers: this.header });
    }

    addComputer(computer: Computer): Observable<Computer> {
        const header: HttpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.token);
        return this.http.post<Computer>(this.urlComputers, (computer), { headers: header });
    }
} 