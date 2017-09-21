import { Component, OnInit } from '@angular/core';

import {} from '@types/googlemaps';

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


  constructor() { }

  ngOnInit() {
    this.map = "100";
    this.mapcenter = "USA";
    this.zoom = 5;
  }

  updateCenter(){
    this.mapcenter = this.searchbox;
    this.zoom = 11;
  }

}
