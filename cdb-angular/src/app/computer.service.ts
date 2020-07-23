import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from './models/computer.model'
import { HttpClient } from '@angular/common/http'
 
@Injectable({ 
    providedIn: 'root'
})
export class ComputerService {
    private baseUrl: string = 'http://10.0.1.217:8080/webapp/';
    private urlComputers: string = this.baseUrl + "computers/";

    constructor(private http: HttpClient) { }

    getComputerList(): Observable<Computer[]> {
        return this.http.get<Computer[]>(this.urlComputers);
    }
 
    addComputer(computer: Computer) {
        
    }
}