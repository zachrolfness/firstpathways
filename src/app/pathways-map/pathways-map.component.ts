import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database-service/database.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MapUserService } from '../map-user-service/mapuser.service';

@Component({
  selector: 'pathways-map',
  templateUrl: './pathways-map.component.html',
  styleUrls: ['./pathways-map.component.css']
})
export class PathwaysMapComponent implements OnInit {

  mapcenter: string;
  zoom: number;
  map: string;

  searchbox: string;

  data: FirebaseListObservable<any>;

  public mapTeams = [];
  public positions = [];

  constructor(private db: DatabaseService) {

   }

  ngOnInit() {

    this.map = "100";
    this.mapcenter = "United States of America";
    this.zoom = 5;
    this.mapTeams = this.getMarkers();
  }

  updateCenter(){
    this.mapcenter = this.searchbox;
    this.zoom = 11;
  }

  getMarkers() {
    //create an array of users
    this.mapTeams = [];

    this.data = this.db.getMapUsers();

    this.data.subscribe(
      values => {
        //set an index variable to go through the list of objects returned from firebase
        var index;
        //sort through list
        for(index in values){
          //set value to be the indexed firebase object
          var value = values[index];
          var user = new MapUserService();
          user.newUser(value);
          if (user.isValid()) {
            this.mapTeams.push(user);
          }
        }

      }
    );
    return this.mapTeams;
  }


}
