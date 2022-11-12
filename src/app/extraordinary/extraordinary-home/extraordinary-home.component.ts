import { Component, OnInit } from '@angular/core';
import { ACTIVE_PATH } from 'src/app/app.constants';

@Component({
  selector: 'app-extraordinary-home',
  templateUrl: './extraordinary-home.component.html',
  styleUrls: ['./extraordinary-home.component.css']
})
export class ExtraordinaryHomeComponent implements OnInit {

  constructor() {
    sessionStorage.setItem(ACTIVE_PATH, "extraordinary");
   }

  ngOnInit(): void {
  }

}
