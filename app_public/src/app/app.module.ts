import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import AppRoutingModule from "./app.routing.module";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent, TimeZonePipe } from "./dashboard/dashboard.component";
import { HeaderComponent } from "./header/header.component";
import { AddCatComponent } from "./add-cat/add-cat.component";
import { RegisterComponent } from "./register/register.component";
import { ManageComponent } from "./manage/manage.component";


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app.material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DashboardComponent,
        TimeZonePipe,
        HeaderComponent,
        AddCatComponent,
        RegisterComponent,
        ManageComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        AppRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSidenavModule,
        LayoutModule,
    ],
    bootstrap: [
      AppComponent
    ],
    providers: [
        provideAnimationsAsync()
    ],
})
export class AppModule {}
