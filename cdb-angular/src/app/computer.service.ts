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

    constructor(private http: HttpClient) { }

    getComputerList(): Observable<Computer[]> {
        return this.http.get<Computer[]>(this.urlComputers);
    }

    addComputer(computer: Computer): Observable<Computer> {
        const header: HttpHeaders = new HttpHeaders();
        header.append('Content-Type', 'application/json');
        return this.http.post<Computer>(this.urlComputers, (computer), { headers: header });
    }
}