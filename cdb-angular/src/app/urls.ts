import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class Urls {
    static readonly baseUrl: string = 'http://10.0.1.220:8080/cdbmaven/';
    static readonly authUrl: string = Urls.baseUrl + 'authenticate/';
    static readonly computersUrl: string = Urls.baseUrl + 'api/computers/';
    static readonly registerUrl: string = Urls.baseUrl + 'register/';
    static readonly registerAdminUrl: string = Urls.registerUrl + 'admin/';
    static readonly companiesUrl: string = Urls.baseUrl + 'api/companies/';
    static readonly computerCountUrl = Urls.computersUrl + 'count/';
} 