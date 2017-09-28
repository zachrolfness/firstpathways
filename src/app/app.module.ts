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
import { PathwaysComponent } from './pathways/pathways.component';
import { StartComponent } from './start/start.component';
import { TravelBookComponent } from './travel-book/travel-book.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component'

import { AuthService } from './auth-service/auth.service';
import { DatabaseService } from './database-service/database.service';
import { StorageService } from './storage-service/storage.service';
import { BlueAllianceService } from './blue-alliance-service/blue-alliance.service';
import { NguiMapModule} from '@ngui/map';
import { TagsService } from './tags-service/tags.service';

import * as firebase from 'firebase';
import { TeamsComponent } from './teams/teams.component';
import { ResourcesComponent } from './resources/resources.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ResourceCardComponent } from './resource-card/resource-card.component';

import {} from '@types/googlemaps';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PathwaysMapComponent } from './pathways-map/pathways-map.component';
import { PathwaysModelComponent } from './pathways-model/pathways-model.component';
import { PathwaysApplyComponent } from './pathways-apply/pathways-apply.component';
import {} from '@types/googlemaps';

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
		BrowserAnimationsModule,
		NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCkgR8jyI8fjSdFd2E3F7UZHhwWfGsp270'})
	],
	declarations: [
		AppComponent,
		TravelBookComponent,
		PathwaysComponent,
		StartComponent,
		HomeComponent,
		HeaderComponent,
		ProfileComponent,
		LoginComponent,
		SignUpComponent,
		TeamsComponent,
		ResourcesComponent,
		SidebarComponent,
		ResourceCardComponent,
		PathwaysMapComponent,
		PathwaysModelComponent,
		PathwaysApplyComponent
	],
	bootstrap: [ AppComponent ],
	providers: [
		AuthService,
		DatabaseService,
		StorageService,
		BlueAllianceService,
		TagsService
	]
})
export class AppModule {}
