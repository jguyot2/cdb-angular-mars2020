import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from './models/computer.model'
import { Page } from './models/page.model'
import { Urls } from './urls'
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class ComputerService {
    constructor(private http: HttpClient, private urls : Urls, private auth: AuthenticationService) { }

    getNumberComputers(): Observable<number> {
        if(this.auth.isLoggedIn()){
            return this.http.get<number>(
                this.urls.computersUrl + "number", 
                { headers:  new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer '+ this.auth.getToken())
                }
            );
        }
    }

    getPaginatedComputerList(page: Page): Observable<Computer[]> {
        if(this.auth.isLoggedIn()){
            return this.http.get<Computer[]>(this.urls.computersUrl + "page", {
                params: new HttpParams()
                    .append("pageSize", page.pageSize.toString())
                    .append("currentPage", page.currentPage.toString()),
                headers : new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer '+ this.auth.getToken())
            });
        }
    }

    getComputerList(): Observable<Computer[]> {
        if(this.auth.isLoggedIn()){
            return this.http.get<Computer[]>(
                this.urls.computersUrl, 
                {
                    headers: new HttpHeaders()
                        .set('Content-Type', 'application/json')
                        .set('Authorization', 'Bearer '+ this.auth.getToken())
                    ,
                    observe: 'body',
                    responseType: 'json'
                }
            );
        }
    }
    
    addComputer(computer: Computer) {
        if(this.auth.isLoggedInAsAdmin()){
            return this.http.post(
                this.urls.computersUrl,
                computer,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.auth.getToken()
                    }),
                    observe: 'body',
                    responseType: 'json'
                }
            );
        }
    }

    deleteComputer(computer: Computer): Observable<void> {
        if(this.auth.isLoggedInAsAdmin()){
            return this.http.delete<void>(
                this.urls.computersUrl + computer.idComputer, { 
                    headers: new HttpHeaders({
                        'Authorization': 'Bearer '+ this.auth.getToken()
                    }),
                }
            );
        }
    }

    searchComputer(search: string, page: Page): Observable<Computer[]> {
        if(this.auth.isLoggedIn()){
            return this.http.get<Computer[]>(this.urls.computersUrl + "search/" + search, {
                params: new HttpParams()
                    .append("pageSize", page.pageSize.toString())
                    .append("currentPage", page.currentPage.toString()),
                headers : new HttpHeaders({
                    'Authorization': 'Bearer '+ this.auth.getToken()
                }),
            });
        }    
    }

    getNumberSearchComputers(search: string): Observable<number> {
        if(this.auth.isLoggedIn()){
            return this.http.get<number>(this.urls.computersUrl + "search/"+ search +"/number", {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer '+ this.auth.getToken()
                }),
            });
        }
    }

    orderComputers(orderBy: string, page: Page): Observable<Computer[]> {
        if(this.auth.isLoggedIn()){
            return this.http.get<Computer[]>(this.urls.computersUrl + "orderBy/" + orderBy, {
                params: new HttpParams()
                    .append("pageSize", page.pageSize.toString())
                    .append("currentPage", page.currentPage.toString()),
                headers : new HttpHeaders({
                    'Authorization': 'Bearer '+ this.auth.getToken()
                }),
            });   
        } 
    }

    orderAndSearchComputers(orderBy: string, search: string, page: Page): Observable<Computer[]> {
        if(this.auth.isLoggedIn()){
            return this.http.get<Computer[]>(this.urls.computersUrl + "searchOrder/" + orderBy + "/" + search, {
                params: new HttpParams()
                    .append("pageSize", page.pageSize.toString())
                    .append("currentPage", page.currentPage.toString()),
                headers : new HttpHeaders({
                    'Authorization': 'Bearer '+ this.auth.getToken()
                }),
            });    
        }        
    }

} 