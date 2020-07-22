import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from './models/computer.model'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class ComputerService {
    private base_url: string = 'http://10.0.1.220:8080/webapp/api/';
    private url_list: string = this.base_url + "list";

    constructor(private http: HttpClient) { }

    getComputerList(): Observable<Computer[]> {
        return this.http.get<Computer[]>(this.url_list);
    }
 
    addComputer(computer: Computer) {
        //TODO 
    }
}