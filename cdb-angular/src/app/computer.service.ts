import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from './models/computer.model'
import { Page } from './models/page.model'
import { Urls } from './urls'
import { AuthenticationService } from './auth/authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DashboardParameters } from './models/dashboard-parameters.model';
@Injectable({
    providedIn: 'root'
})
export class ComputerService {

    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    private getHttpParametersFromPageParams(params: DashboardParameters) {
        console.log("plopiplop");
        console.log(params.toString());
        console.log(params.page.pageLength.toString());
        var requestParameters = new HttpParams()
            .set("pageLength", params.page.pageLength.toString())
            .set("pageNumber", params.page.pageNumber.toString());
        if (params.search) {
            console.log("recherche=" + params.search);
            requestParameters = requestParameters.set("search", params.search);
        }
        if (params.sort?.trim().length > 0)
            requestParameters = requestParameters.set("sort", params.sort);
        console.log(requestParameters);
        return requestParameters;
    }

    getComputers(pageParameters: DashboardParameters): Observable<Computer[]> {
        const requestParameters = this.getHttpParametersFromPageParams(pageParameters);
        return this.http.get<Computer[]>(
            Urls.computersUrl,
            {
                params: requestParameters,
                headers: new HttpHeaders()
                    .set('Authorization', 'Bearer ' + this.auth.getToken()),
                responseType: "json"
            });
    }

    getComputersNumber(pageParameters: DashboardParameters): Observable<number> {
        const params = pageParameters.search ?
            new HttpParams().set("search", pageParameters.search) : new HttpParams();
        return this.http.get<number>(
            Urls.computerCountUrl,
            {
                params: params,
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer ' + this.auth.getToken()),
                responseType: "json"
            });
    }

    /////////// OLD /////////////

    addComputer(computer: Computer) {
        console.log(Urls.computersUrl);
        if (this.auth.isLoggedInAsAdmin()) {
            return this.http.post(
                Urls.computersUrl,
                computer,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.auth.getToken()
                    }),
                    observe: 'body',
                    responseType: 'json'
                }
            );
        }
    }

    deleteComputer(computer: Computer): Observable<void> {
        if (this.auth.isLoggedInAsAdmin()) {
            return this.http.delete<void>(
                Urls.computersUrl + computer.id, {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this.auth.getToken()
                }),
            });
        }
    }

    editComputer(newComputer: Computer) {
        console.log("editiing");
        console.log(newComputer);
        if (this.auth.isLoggedIn()) {
            return this.http.put(Urls.computersUrl,
                newComputer,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.auth.getToken()
                    }),
                    observe: 'body',
                    responseType: 'json'
                });
        }

    }
    orderComputers(orderBy: string, page: Page): Observable<Computer[]> {
        if (this.auth.isLoggedIn()) {
            return this.http.get<Computer[]>(Urls.computersUrl + "orderBy/" + orderBy, {
                params: new HttpParams()
                    .append("pageLength", page.pageLength.toString())
                    .append("pageNumber", page.pageNumber.toString()),
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this.auth.getToken()
                }),
            });
        }
    }
}