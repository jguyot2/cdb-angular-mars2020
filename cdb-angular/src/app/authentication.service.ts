import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { Authentication } from './models/authentication.model';
import { Urls } from './urls';
import { Credentials } from './models/credentials.model'

@Injectable({ 
    providedIn: 'root'
})
export class AuthenticationService{

    constructor(private http: HttpClient) {}

    private authenticate(credentials:Credentials) : Observable<Authentication> {

        return this.http.post<Authentication>(
            Urls.authUrl,
            JSON.stringify({
                username:credentials.username, password:credentials.password
            }),
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                observe: 'body',
                responseType: 'json'
            }
        );
    }

    private handleError(error : HttpErrorResponse):string{
        if (error.error instanceof ErrorEvent) {
            return 'An error occured: '+ error.error.message
        } else {
            return 'An error has occured: code ' + error.status + ', body '+error.error
        }
    }

    public login(credentials:Credentials,onSuccess: Function, onError: Function): void{
        this.authenticate(credentials).pipe(take(1)).subscribe({
            next : (auth:Authentication) => {this.setSession(auth, credentials.username); onSuccess()},
            error : err =>  onError(err)
        })
    }

    private setSession(authResult : Authentication, username: string) {
        localStorage.setItem('jwt', authResult.jwt);
        localStorage.setItem('role', authResult.role);
        localStorage.getItem('username');
    }

    private getRole() : string{
        return localStorage.getItem('role');
    }

    public isLoggedInAsAdmin() : boolean{
        return this.isLoggedIn() && this.getRole() === 'ROLE_ADMIN'
    }

    public getToken() : string{
        return localStorage.getItem('jwt');
    }

    public getName() : string{
        return localStorage.getItem('username');
    }

    public isLoggedIn() : boolean {
        return localStorage.getItem('jwt') !== null && localStorage.getItem('jwt') !== undefined;
    }

    logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
    }
}