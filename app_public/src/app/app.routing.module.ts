import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddCatComponent } from "./add-cat/add-cat.component";
import { RegisterComponent } from "./register/register.component";
import { ManageComponent } from "./manage/manage.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "addCat", component: AddCatComponent},
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
