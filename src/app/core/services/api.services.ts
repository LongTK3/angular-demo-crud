import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user-model';
import { environment } from 'src/enviroments/enviroment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user).pipe(
            catchError(this.handleError)
        );
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
            catchError(this.handleError)
        );
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => error);
    }
}
