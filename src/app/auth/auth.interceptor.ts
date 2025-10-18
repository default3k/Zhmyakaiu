import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "./auth";
import { catchError, switchMap, throwError } from "rxjs";
import { Router } from "@angular/router";


let isRefreshing = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(Auth);
    const token = auth.token; 

    if(!token) return next(req)

    if (isRefreshing) {
        return RefreshAndProceed(auth, req, next)
    }

    return next(addToken(req, token))
        .pipe(
            catchError(error => {
            if (error.status === 401 || error.status === 403) {
                return RefreshAndProceed(auth, req, next)
            }
            return throwError(() => error);
        })
    );
}

const RefreshAndProceed = (
    auth:Auth, 
    req:HttpRequest<any>, 
    next:HttpHandlerFn
    ) => {
    if (!isRefreshing) {
        isRefreshing = true;
        return auth.refreshAuthToken()
        .pipe(
        switchMap(res => {
            isRefreshing = false;
            return next(addToken(req, res.access_token))
        }),
        catchError(error => {
                isRefreshing = false;
                //ЕСЛИ REFRESH НЕ УДАЛСЯ - РЕДИРЕКТ НА ЛОГИН
                auth.logout();
                inject(Router).navigate(['/login']);
                return throwError(() => error);
        })
    )
    }
    return next(addToken(req, auth.token!))
}

const addToken = (req:HttpRequest<any>, token:string) => {
    return req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
}