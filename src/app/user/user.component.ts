import { Component, OnInit, HostListener } from "@angular/core";
import { ToggleService } from "../services/data/toggle.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  isChecked: boolean;

  constructor(private toggleService: ToggleService) {}

  ngOnInit() {
    this.toggle();
    this.isChecked = true;
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleUser();
  }

  onChange($event) {
    console.log($event);
  }
}
