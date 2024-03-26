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
import { CatComponent } from "./cat/cat.component";
import { HeaderComponent } from "./header/header.component";
import { AddCatComponent } from "./add-cat/add-cat.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CatComponent,
        HeaderComponent,
        AddCatComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        AppRoutingModule,
        MatButtonModule,
        MatCardModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        provideAnimationsAsync()
    ],
})
export class AppModule {}
