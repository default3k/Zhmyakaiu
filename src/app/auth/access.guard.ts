import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const сanActivateAuth: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    
    console.log('🛡️ Guard check - isAuth:', auth.isAuth);
    
    // Дополнительная проверка - если токен есть, но он может быть просрочен
    if (auth.isAuth) {
        console.log('✅ Access granted by guard');
        return true;
    } else {
        console.log('❌ No token, redirecting to login');
        // Сохраняем URL для редиректа после логина
        return router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url }
        });
    }
};