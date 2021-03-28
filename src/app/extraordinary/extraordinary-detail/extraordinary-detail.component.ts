import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExtraordinaryService } from "../extraordinary.service";
import { AuthenticationService } from "../../auth/authentication.service";
import { ErrorService } from "../../services/data/error.service";

@Component({
  selector: "app-extraordinary-detail",
  templateUrl: "./extraordinary-detail.component.html",
  styleUrls: ["./extraordinary-detail.component.css"]
})
export class ExtraordinaryDetailComponent implements OnInit {
  id: number;
  username: string;

  errorMessage: string;
  date: Date;
  month: number;
  year: number;
  returnUrl: string;

  extraordinary: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private service: ExtraordinaryService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.route.params.subscribe(params => {
      this.id = +params["id"];
    });
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();

    this.returnUrl = "/important/" + this.year + "/" + this.month;
    this.extraordinary = this.service
      .getExtraordinaryByid(this.username, this.id)
      .subscribe(
        extra => {
          this.extraordinary = extra;
        },
        error => {
          this.errorService.displayMessage(error, this.returnUrl);
        }
      );
  }

}
