import { Component, OnInit, HostListener } from "@angular/core";
import { ToggleService } from "../services/data/toggle.service";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"]
})
export class StatisticsComponent implements OnInit {
  constructor(private toggleService: ToggleService) {}

  ngOnInit() {
    this.toggle();
  }

  @HostListener("submit")
  private toggle() {
    this.toggleService.toggleStatistics();
  }
}
