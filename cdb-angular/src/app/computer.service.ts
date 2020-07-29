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

    private token: string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNTk2MDY4NTEzLCJpYXQiOjE1OTYwMDg1MTN9.ldaWciGggP8krfk1jkE5oVrCPLpII8bBLw6r_WHFcMXtHGRT_GTyGTXpLEQO0T7ZkHQyDZme5G6q2jkbrfXgIQ";

    header: HttpHeaders = new HttpHeaders()
    .append('Authorization', this.token);
    
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

    addComputer(computer: Computer): Observable<Computer> {
        const header: HttpHeaders = new HttpHeaders();
        header.append('Content-Type', 'application/json');
        return this.http.post<Computer>(this.urlComputers, (computer), { headers: header });
    }
}