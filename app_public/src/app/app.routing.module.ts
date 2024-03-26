import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CatComponent } from "./cat/cat.component";
import { AddCatComponent } from "./add-cat/add-cat.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "addCat", component: AddCatComponent},
    {path: "cat/:id", component : CatComponent},
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