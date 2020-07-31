import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService {
    protected baseUrl: string = 'https://reqres.in/api/';

    constructor(private http: HttpClient) { }

    userLogin(email: string, password: string): Observable<any> {
        const userLoginInfo = { email, password };
        return this.http.post<any>(this.baseUrl + 'login', userLoginInfo);
    }
    registerUser(email: string, password: string): Observable<any> {
        const userInfo = { email, password };
        return this.http.post<any>(this.baseUrl + 'register', userInfo);
    }
    getUser(userId): Observable<any> {
        return this.http.get<any>(this.baseUrl + 'users/' + userId);
    }
    
    // a service for checking exist emails
    // this service uses a fake list of emails
    emailCheck(email: string): Observable<boolean> {
        let fakeExistEmails = [
            "lindsay.ferguson@reqres.in",
            "tobias.funke@reqres.in",
            "byron.fields@reqres.in",
            "george.edwards@reqres.in",
            "rachel.howell@reqres.in",
            "george.bluth@reqres.in",
            "janet.weaver@reqres.in",
            "emma.wong@reqres.in",
            "charles.morris@reqres.in",
            "tracey.ramos@reqres.in"
        ];

        return of(fakeExistEmails.includes(email));
    }
}
