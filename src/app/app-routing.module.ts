import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StartComponent } from './start/start.component';
import { TravelBookComponent } from './travel-book/travel-book.component';

import { LoginComponent } from './login/login.component';

import { ProfileComponent } from './profile/profile.component';

import {SignUpComponent} from './signup/signup.component'

const routes = [{
	path: 'home',
	component: HomeComponent
}, {
	path: 'about',
	component: AboutComponent
}, {
	path: 'start',
	component: StartComponent
}, {
	path: 'travel-book',
	component: TravelBookComponent
}, {
	path: 'login',
	component: LoginComponent
}, {
	path: 'profile',
	component: ProfileComponent
}, {
	path: 'signup',
	component: SignUpComponent
}, {
	path: '',
	redirectTo: '/home',
	pathMatch: 'full'
}];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
