import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { SaerchPage } from './pages/saerch-page/saerch-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { Layout } from './common-ui/layout/layout';
import { сanActivateAuth } from './auth/access.guard';

export const routes: Routes = [
    {path: '', component: Layout, children: [
        {path: '', component: SaerchPage},
        {path: 'profile/:id', component: ProfilePage}
        ],
        canActivate: [сanActivateAuth]
    },
    {path: 'login', component: LoginPage},
];
