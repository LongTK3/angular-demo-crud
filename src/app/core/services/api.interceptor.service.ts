import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Import catchError
import { throwError } from 'rxjs'; // Import throwError

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer YOUR_TOKEN'  // Nếu có token
            }
        });

        return next.handle(clonedRequest).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => error);
    }
}
