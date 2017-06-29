import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StartComponent } from './start/start.component';
import { TravelBookComponent } from './travel-book/travel-book.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import {SignUpComponent} from './signup/signup.component'

import { AuthService } from './auth-service/auth.service';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AngularFireModule.initializeApp(environment.firebase, 'firstpathways'), // imports firebase/app needed for everything
		AngularFireDatabaseModule, // imports firebase/database, only needed for database features
		AngularFireAuthModule, // imports firebase/auth, only needed for auth features
		AppRoutingModule,
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
		SignUpComponent
	],
	bootstrap: [ AppComponent ],
	providers: [AuthService]
})
export class AppModule {}
