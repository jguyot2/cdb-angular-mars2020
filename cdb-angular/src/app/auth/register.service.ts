import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { Urls } from '../urls';
import { AuthenticationService } from './authentication.service';
import { Credentials } from '../models/credentials.model'

@Injectable({ 
    providedIn: 'root'
})
export class RegisterService{

    constructor(private http: HttpClient, private auth: AuthenticationService) {}

    public registerUser(credentials: Credentials, onSuccess: Function, onError:Function): void{
        this.http.post(
            Urls.registerUrl,
            JSON.stringify({
                username:credentials.username,
                password:credentials.password
            }),
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                observe: 'body',
                responseType: 'text'
            }
        ).pipe(take(1)).subscribe({
            next: x => onSuccess(),
            error: error => onError(error)
        });
    }

    public registerAdmin(username, password): Observable<string>{
        if(this.auth.isLoggedInAsAdmin()){
            return this.http.post(
                Urls.registerAdminUrl,
                JSON.stringify({
                    username:username, password:password
                }),
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.auth.getToken()
                    }),
                    observe: 'body',
                    responseType: 'text'
                }
            );
        }
        
    }

}