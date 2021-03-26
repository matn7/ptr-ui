import { Component, OnInit, InjectionToken } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/timer';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isChecked = true;
  minDate = new Date(2020,1,1);
  maxDate = new Date(2020,8,1);

  categories = [
    { name: 'Beginner' },
    { name: 'Intermediate' },
    { name: 'Advanced' }
  ];

  colors = [
    { id: 1, name: 'Red' },
    { id: 2, name: 'Green' },
    { id: 3, name: 'Blue' }
  ];

  color = 2;

  progress = 0;
  timer;

  isLoading = false;

  constructor(private dialog: MatDialog) { 
    this.timer = setInterval(() => {
      this.progress++;
      if (this.progress == 100) clearInterval(this.timer);
    }, 20);

    this.isLoading = true;
    this.getCourses()
      .subscribe(x => this.isLoading = false);
  }

  ngOnInit() {
  }

  onChange($event) {
    console.log($event);
  }

  selectCategory(category) {
    this.categories
      .filter(c => c != category)
      .forEach(c => c['selected'] = false);

    category.selected = !category.selected;
  }

  getCourses() {
    return Observable.timer(2000);
  }

}
