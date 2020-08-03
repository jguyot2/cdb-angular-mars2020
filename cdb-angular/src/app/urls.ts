import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class Urls {
    static readonly baseUrl: string = 'http://localhost:8080/webapp/';
    static readonly authUrl: string = Urls.baseUrl + 'authenticate/';
    static readonly computersUrl: string = Urls.baseUrl + 'computers/';
    static readonly registerUrl: string = Urls.baseUrl + 'register/';
    static readonly registerAdminUrl: string = Urls.registerUrl + 'admin/';
    static readonly companiesUrl: string = Urls.baseUrl + 'companies/';
    static readonly numberUrl: string = Urls.computersUrl + 'number/';
    static readonly pageUrl: string = Urls.computersUrl + 'page/';
    static readonly searchUrl: string = Urls.computersUrl + 'search/'

}