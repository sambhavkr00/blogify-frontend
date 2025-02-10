import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ViewPostComponent } from './components/viewpost/viewpost.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { EditpostComponent } from './components/editpost/editpost.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { MydraftsComponent } from './components/mydrafts/mydrafts.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ViewPostComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    EditpostComponent,
    CreatepostComponent,
    MydraftsComponent,
    AnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
