import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

	public user: Observable<firebase.User>;

	public isLoggedIn: boolean;

	constructor(private afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe((auth) => {
			if(auth) {
				this.isLoggedIn = true;
			} else {
				this.isLoggedIn = false;
			}
			console.log(this.isLoggedIn);
		});
	}

	public login(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then((user) => {
				console.log('Logged in as ' + user.email);
			});
	}

	public signUp(email: string, password: string) {
		this.afAuth.auth.createUserWithEmailAndPassword(email, password);
	}

	public logout() {
		this.afAuth.auth.signOut();
	}
}
