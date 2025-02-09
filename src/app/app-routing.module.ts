import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MydraftsComponent } from './components/mydrafts/mydrafts.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { ViewPostComponent } from './components/viewpost/viewpost.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'createpost', component: CreatepostComponent },
  { path: 'viewpost/:postid', component: ViewPostComponent },
  { path: 'mydrafts', component: MydraftsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
