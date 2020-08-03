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
    private token: string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aXR1cyIsImV4cCI6MjE5NjI4MzQ3OSwiaWF0IjoxNTk2MjgzNDc5fQ.GfJkVU7a42CajbK_LV8yrxXpPmbHz17kXmAD6IuRo0Xx9UBiR8qp1MCdPySzZgEJHWa-yd_MqB8p3MG5efg0Uw";

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