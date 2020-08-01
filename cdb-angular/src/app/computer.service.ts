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
    private token: string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNTk2MzYzMDEyLCJpYXQiOjE1OTYzMDMwMTJ9.RJTrnqsTm7fE6QVdXLcjgL5wOg5WoqVXpSdvleH2o0QREx8xDAS04Eq6acnANjqmnGx0djqLWtRZHTMQ5pY5vA";
    header: HttpHeaders = new HttpHeaders()
        .append('Authorization', this.token);
    
    constructor(private http: HttpClient) { }

    getComputerList(): Observable<Computer[]> {
        return this.http.get<Computer[]>(this.urlComputers, { headers: this.header });
    }

    getPaginatedComputerList(page: Page): Observable<Computer[]> {
        const header: HttpHeaders = new HttpHeaders()
            .set('Authorization', this.token);
        return this.http.get<Computer[]>(this.urlComputers + "page", {
            params: new HttpParams()
                .append("pageSize", page.pageSize.toString())
                .append("currentPage", page.currentPage.toString()),
            headers : header
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

    deleteComputer(computer: Computer): Observable<void> {
        const header: HttpHeaders = new HttpHeaders()
            .set('Authorization', this.token);
        return this.http.delete<void>(this.urlComputers + computer.idComputer, { headers: header });
    }

    searchComputer(search: string, page: Page): Observable<Computer[]> {
        const header: HttpHeaders = new HttpHeaders()
        .set('Authorization', this.token);
        return this.http.get<Computer[]>(this.urlComputers + "search/" + search, {
            params: new HttpParams()
                .append("pageSize", page.pageSize.toString())
                .append("currentPage", page.currentPage.toString()),
            headers : header
        });    
    }

    getNumberSearchComputers(search: string): Observable<number> {
        const header: HttpHeaders = new HttpHeaders()
        .set('Authorization', this.token);
        return this.http.get<number>(this.urlComputers + "search/"+ search +"/number", { headers: this.header });
    }

    orderComputers(orderBy: string, page: Page): Observable<Computer[]> {
        const header: HttpHeaders = new HttpHeaders()
        .set('Authorization', this.token);
        return this.http.get<Computer[]>(this.urlComputers + "orderBy/" + orderBy, {
            params: new HttpParams()
                .append("pageSize", page.pageSize.toString())
                .append("currentPage", page.currentPage.toString()),
            headers : header
        });    
    }

} 