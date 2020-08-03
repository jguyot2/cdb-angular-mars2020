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
    
    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    getNumberComputers(): Observable<number> {
        if(this.auth.isLoggedIn()){
            return this.http.get<number>(
                Urls.numberUrl, 
                { headers:  new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer '+ this.auth.getToken())
                }
            );
        }
    }

    getPaginatedComputerList(page: Page): Observable<Computer[]> {
        if(this.auth.isLoggedIn()){
            return this.http.get<Computer[]>(Urls.pageUrl, {
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
                Urls.computersUrl, 
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
                Urls.computersUrl,
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
                Urls.computersUrl + computer.idComputer, { 
                    headers: new HttpHeaders({
                        'Authorization': 'Bearer '+ this.auth.getToken()
                    }),
                }
            );
        }
    }

    searchComputer(search: string, page: Page): Observable<Computer[]> {
        if(this.auth.isLoggedIn()){
            return this.http.get<Computer[]>(Urls.searchUrl + search, {
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
            return this.http.get<number>(Urls.computersUrl + "search/"+ search +"/number", {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer '+ this.auth.getToken()
                }),
            });
        }
    }

} 