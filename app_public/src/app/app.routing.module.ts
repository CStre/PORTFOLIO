import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountComponent } from "./account/account.component";
import { RegisterComponent } from "./register/register.component";
import { ManageComponent } from "./manage/manage.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "account", component: AccountComponent},
    {path: "register", component: RegisterComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "administration", component: ManageComponent}
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
