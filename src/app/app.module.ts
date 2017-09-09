import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule }     from './app-routing.module';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StartComponent } from './start/start.component';
import { TravelBookComponent } from './travel-book/travel-book.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component'

import { AuthService } from './auth-service/auth.service';
import { DatabaseService } from './database-service/database.service';
import { StorageService } from './storage-service/storage.service';

import * as firebase from 'firebase';
import { TeamsComponent } from './teams/teams.component';
import { ResourcesComponent } from './resources/resources.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ResourceCardComponent } from './resource-card/resource-card.component';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

firebase.initializeApp(environment.firebase);

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AngularFireModule.initializeApp(environment.firebase, 'firstpathways'),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		AppRoutingModule,
		TagInputModule,
		BrowserAnimationsModule
	],
	declarations: [
		AppComponent,
		TravelBookComponent,
		AboutComponent,
		StartComponent,
		HomeComponent,
		HeaderComponent,
		ProfileComponent,
		LoginComponent,
		SignUpComponent,
		TeamsComponent,
		ResourcesComponent,
		SidebarComponent,
		ResourceCardComponent
	],
	bootstrap: [ AppComponent ],
	providers: [
		AuthService,
		DatabaseService,
		StorageService
	]
})
export class AppModule {}
