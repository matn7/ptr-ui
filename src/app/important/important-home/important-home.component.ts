import { Component, OnInit } from '@angular/core';
import { ACTIVE_PATH } from 'src/app/app.constants';

@Component({
  selector: 'app-important-home',
  templateUrl: './important-home.component.html',
  styleUrls: ['./important-home.component.css']
})
export class ImportantHomeComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
    console.log("important");
    sessionStorage.setItem(ACTIVE_PATH, "important");
  }

}
