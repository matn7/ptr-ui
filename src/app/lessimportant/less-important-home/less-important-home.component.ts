import { Component, OnInit } from '@angular/core';
import { ACTIVE_PATH } from 'src/app/app.constants';

@Component({
  selector: 'app-less-important-home',
  templateUrl: './less-important-home.component.html',
  styleUrls: ['./less-important-home.component.css']
})
export class LessImportantHomeComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
    console.log("lessimportant");
    sessionStorage.setItem(ACTIVE_PATH, "lessimportant");
  }

}
