import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
<<<<<<< HEAD
  
=======

>>>>>>> 0a3ff1469286bf2e94d452570fa13453d77b6c10
  items: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/items');
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 0a3ff1469286bf2e94d452570fa13453d77b6c10
