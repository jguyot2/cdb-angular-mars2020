import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class Urls {
    baseUrl: string = 'http://localhost:8080/webapp/';
    authUrl: string = this.baseUrl + 'authenticate/';
    computersUrl: string = this.baseUrl + 'computers/';

}