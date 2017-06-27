import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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


@NgModule({
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
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
		HeaderComponent
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
