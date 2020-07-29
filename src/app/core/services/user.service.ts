import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, RegisterUser } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    protected baseUrl: string = 'https://reqres.in/api/';

    // mock employee info data
    employeeInfoList: RegisterUser[] = [
        { id: 1, firstName: "Alana", lastName: "Hammond", email: "Software Delivery", phone: "123456789", dob: "123" },
        { id: 2, firstName: "Chris", lastName: "Thorburn", email: "Accounting", phone: "123456789", dob: "123" },
        { id: 3, firstName: "Katrina", lastName: "Maguire", email: "HR", phone: "123456789", dob: "123" },
        { id: 4, firstName: "Tony", lastName: "Burge", email: "Software Delivery", phone: "123456789", dob: "123" }
    ];

    constructor(private http: HttpClient) { }

    userLogin(email: string, password: string): Observable<string> {
        const userLoginInfo = { email, password };
        return this.http.post<string>(this.baseUrl + 'login', userLoginInfo);
    }
    registerUser(email: string, password: string): Observable<any> {
        const userInfo = { email, password };
        return this.http.post<any>(this.baseUrl + 'register', userInfo);
    }
    getUser(userId): Observable<User> {
        return this.http.get<User>(this.baseUrl + 'users/' + userId);
    }
}
