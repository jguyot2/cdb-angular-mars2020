import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from './models/computer.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class ComputerService {
    // URL du serveur à changer
    private baseUrl: string = 'http://localhost:8080/webapp/';
    private urlComputers: string = this.baseUrl + "computers/";
    private token: string = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNjAyMDExMjY5LCJpYXQiOjE1OTYwMTEyNjl9.2TYbWqHRgtiYTeJ7gUieGVpGx1HHhE3Na7SbAA1jJp-0yuMko0bPlXcoK42zGYqujdack405oOEzacey6fmzPA"
    constructor(private http: HttpClient) { }

    getComputerList(): Observable<Computer[]> {
        var header: HttpHeaders = new HttpHeaders().set('Authorization', this.token);
        console.log(header);
        return this.http.get<Computer[]>(this.urlComputers, { "headers": header });
    }

    addComputer(computer: Computer): Observable<Computer> {
        var header: HttpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.token);
        return this.http.post<Computer>(this.urlComputers, (computer), { "headers": header });
    }
} 