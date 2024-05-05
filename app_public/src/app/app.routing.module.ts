import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountComponent } from "./account/account.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ManageComponent } from "./manage/manage.component";
import { authGuard } from "./auth/auth.guard";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "account", component: AccountComponent, canActivate: [authGuard]},
    {path: "register", component: RegisterComponent},
    {path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },
    {path: "administration", component: ManageComponent},
    {path: "**", redirectTo: "", pathMatch: 'full'}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export default class AppRoutingModule {}
