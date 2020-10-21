import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: string;
  @Input() controlType = 'input';
  @Input() formControlName: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() title: string;
  @Input() id: string;
  @Input() name: string;
  @Input() class: string;
  @Input() hidden: string;

  constructor() { }

  ngOnInit() {
  }

  showErrors() {
    const { touched, errors } = this.control;
    return touched && errors;
  }

}
