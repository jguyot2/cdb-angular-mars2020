import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { Authentication } from './models/authentication.model';
import { Urls } from './urls';
import { isLoweredSymbol } from '@angular/compiler';

@Injectable({ 
    providedIn: 'root'
})
export class AuthenticationService{

    constructor(private http: HttpClient, private urls : Urls) {}

    private authenticate(username : string, passsword : string) : Observable<Authentication> {

        return this.http.post<Authentication>(
            this.urls.authUrl,
            JSON.stringify({
                username:username, password:passsword
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

    private handleError(error : HttpErrorResponse){
        if (error.error instanceof ErrorEvent) {
            return throwError('An error occured: '+ error.error.message)
        } else {
            return throwError('An error has occured: code ' + error.status + ', body '+error.error)
        }
    }

    public login(username : string, passsword : string){
        this.authenticate(username, passsword).pipe(take(1)).subscribe({
            next : (auth:Authentication) => {this.setSession(auth, username); console.log("success")},
            error : err => this.handleError(err).subscribe()
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
        return localStorage.getItem('jwt') !== undefined;
    }

    logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
    }

}