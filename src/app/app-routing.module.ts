import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PathwaysComponent } from './pathways/pathways.component';
import { StartComponent } from './start/start.component';
import { TravelBookComponent } from './travel-book/travel-book.component';

import { LoginComponent } from './login/login.component';

import { ProfileComponent } from './profile/profile.component';

import { SignUpComponent } from './signup/signup.component'

import { TeamsComponent } from './teams/teams.component';
import { ResourcesComponent } from './resources/resources.component';

const routes = [{
	path: 'home',
	component: HomeComponent
}, {
	path: 'about',
	component: PathwaysComponent
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
	path: 'signup',
	component: SignUpComponent
}, {
	path: 'my-profile',
	component: ProfileComponent
}, {
	path: 'my-teams',
	component: TeamsComponent
}, {
	path: 'my-resources',
	component: ResourcesComponent
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
