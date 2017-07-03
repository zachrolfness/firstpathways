import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { User } from '../data-models/user';

@Injectable()
export class AuthService {

	public user: User;

	public uid: string;

	public isLoggedIn: boolean;

	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
		this.afAuth.authState.subscribe((auth) => {
			if(auth) {
				this.isLoggedIn = true;
				this.uid = auth.uid;
			} else {
				this.isLoggedIn = false;
				this.uid = null;
			}
			console.log(this.isLoggedIn);
		});
	}

	public login(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	public signUp(username: string, email: string, password: string) {
		this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				this.db.list('Users').update(user.uid + '', {
					Name: username,
					Email: email,
					PhotoURL: '',
					Bio: '',
					Website: '',
					PathwayTeams: null
				});
			});
	}

	public logout() {
		this.afAuth.auth.signOut();
	}
}
