import { Component, OnInit, Inject } from "@angular/core";
import { ExtraordinaryService } from "../services/extraordinary.service";
import { AuthenticationService } from "../services/authentication.service";
import { Extraordinary } from "./extraordinary.model";
import { Router } from "@angular/router";
import { ErrorService } from "../services/data/error.service";
import { MAT_DIALOG_DATA } from "@angular/material";


@Component({
  selector: "app-extraordinary",
  templateUrl: "./extraordinary.component.html",
  styleUrls: ["./extraordinary.component.css"]
})
export class ExtraordinaryComponent implements OnInit {
  username: string;
  extraordinaryData: Extraordinary[];
  errorNumber: number;
  errorMessage: string;
  returnUrl: string;
  records: Array<number>;

  constructor(
    private extraService: ExtraordinaryService,
    private authService: AuthenticationService,
    private router: Router,
    private errorService: ErrorService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    console.log("Data", data);
  }

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();
    this.returnUrl = "/extraordinary/all";
    this.extraService.getExtraordinaryAll(this.username).subscribe(
      data => {
        console.log(data);
        this.extraordinaryData = data;
        this.records = Array(this.extraordinaryData.length)
          .fill(0)
          .map((x, i) => i);
      },
      error => {
        this.errorService.displayMessage(error, this.returnUrl);
      }
    );
  }

  onView(id: number) {
    this.router.navigate(["/extraordinary/" + id + "/edit"]);
  }

}
