import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "category/:slug",
        component: CategoriesComponent
    },
    {
        path: "checkout",
        component: CheckoutComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "admin",
        component: AdminPanelComponent
    }
];
