import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { Auth } from "./auth";

export const сanActivateAuth = () => {
    const isLoggedIn = inject(Auth).isAuth

    if (isLoggedIn) {
        return true;
    }
    return inject(Router).createUrlTree(['/login']);
}