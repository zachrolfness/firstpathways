import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { DatabaseService } from '../database-service/database.service';
import { NgModel } from '@angular/forms';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-travel-book',
  templateUrl: './travel-book.component.html',
  styleUrls: ['./travel-book.component.css']
})
export class TravelBookComponent implements OnInit {

  tagObject: FirebaseObjectObservable<any>;

  items = [];
  placeholder;

  stringified;
  secondtag;

  tags = ['FRC', 'FTC', 'FLL', 'FLL Jr.', 'General'];

  constructor(public db: AngularFireDatabase) {
    this.tagUpdate(0);
  }

  tagUpdate($event){
    this.db.object('/Tags/').subscribe(snapshot => {
      if(this.items.length == 0){
        this.tags = ['FRC', 'FTC', 'FLL', 'FLLjr', 'General'];
        this.stringified = JSON.stringify(snapshot);
      }
      else if(this.items.length == 1){
        this.stringified = JSON.stringify(snapshot[this.items[0].value]);
        this.tags = [];
        for(var i = 3; i < this.stringified.length - 3; i++){
          if(this.stringified[i] == '"' && this.stringified[i+1] == ':'){
            var loop = true;
            var j = i;
            while(loop){
              j--;
              if(this.stringified[j] == '"'){
                  loop = false;
              }
            }
            this.tags.push(this.stringified.substring(j+1,i));
          }
        }
      }
      else if(this.items.length == 2){
        this.placeholder = snapshot[this.items[0].value];
        this.tags = this.placeholder[this.items[1].value];
      }
    });
  }


  ngOnInit() {
  }

}
