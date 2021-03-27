import { Component, OnInit, Inject } from "@angular/core";
import { Extraordinary } from "../extraordinary.model";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA } from "@angular/material";
import { ExtraordinaryService } from "src/app/services/extraordinary.service";
import { AuthenticationService } from "src/app/registration/authentication.service";
import { ErrorService } from "src/app/services/data/error.service";


@Component({
  selector: 'app-extraordinary-list',
  templateUrl: './extraordinary-list.component.html',
  styleUrls: ['./extraordinary-list.component.css']
})
export class ExtraordinaryListComponent implements OnInit {

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
