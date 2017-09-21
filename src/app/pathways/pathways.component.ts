import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './pathways.component.html',
  styleUrls: ['./pathways.component.css']
})
export class PathwaysComponent implements OnInit {

  model = true;
  map = false;
  apply = false;

  constructor() { }

  ngOnInit() {

  }

  btnModel(){
    this.model = true;
    this.map = false;
    this.apply = false;
  }

  btnApply(){
    this.model = false;
    this.map = false;
    this.apply = true;
  }

  btnMap(){
    this.model = false;
    this.map = true;
    this.apply = false;
  }

}
