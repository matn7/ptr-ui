import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ExtraordinaryService } from "../extraordinary.service";
import { AuthenticationService } from "../../auth/authentication.service";
import { DETAIL_DATE_FORMAT, DATE_FORMAT } from "../../app.constants";
import { TimeService } from "src/app/services/data/time.service";
import { MessagesService } from "src/app/services/data/messages.service";

@Component({
    selector: "app-extraordinary-edit",
    templateUrl: "./extraordinary-edit.component.html"
})
export class ExtraordinaryEditComponent implements OnInit {
    editMode = false;
    editedItemIndex: number;
    editedItem: any;

    extraordinaryData: any;
    username: string;
    date: Date;

    title: string;
    body: string;

    id: number;
    extraordinaryForm: FormGroup;

    startDate: string;
    postedOn: string;
    day: number;
    month: number;
    year: number;

    errorMessage: string;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private extraordinaryService: ExtraordinaryService,
        private datepipe: DatePipe,
        private authService: AuthenticationService,
        private router: Router,
        private timeService: TimeService,
        private messagesService: MessagesService
    ) { }

    ngOnInit() {
        this.username = this.authService.getAuthenticatedUser();
        this.date = new Date();
        this.month = this.date.getMonth() + 1;
        this.year = this.date.getFullYear();

        this.returnUrl = "/important/" + this.year + "/" + this.month;

        this.route.params.subscribe((params: Params) => {
            this.id = +params["id"];
            this.editMode = params["id"] != null;
        });

        if (!this.editMode) {
            this.route.params.subscribe(
                params => {
                    this.day = +params["day"];
                    this.month = +params["month"];
                    this.year = +params["year"];
                    this.startDate = this.datepipe.transform(
                        new Date(this.year, this.month - 1, this.day),
                        DATE_FORMAT
                    );
                    this.postedOn = this.datepipe.transform(
                        new Date(),
                        DETAIL_DATE_FORMAT
                    );
                },
                error => {
                    this.displayError(error);
                }
            );

            // Check for invalid date
            this.timeService.checkDateInFuture(this.year, this.month, this.day, this.returnUrl);
        }
        this.initForm(this.startDate, this.postedOn);

    }

    onSubmit() {
        if (this.editMode) {
            this.extraordinaryService
                .updateExtraordinary(
                    this.username,
                    this.extraordinaryForm.value
                )
                .subscribe(
                    response => {
                        this.router.navigate([
                            "/extraordinary/" + +response["id"] + "/view"
                        ]);
                    },
                    error => {
                        this.displayError(error);
                    }
                );
        } else {
            this.extraordinaryService
                .createExtraordinary(this.username, this.extraordinaryForm.value)
                .subscribe(
                    response => {
                        this.router.navigate([
                            "/extraordinary/" + +response["id"] + "/view"
                        ]);
                    },
                    error => {
                        this.displayError(error);
                    }
                );
        }
    }

    onDelete() {
        if (this.editMode && confirm("Press a button!\nEither OK or Cancel.")) {
            this.extraordinaryService
                .deleteExtraordinary(this.username, this.id)
                .subscribe(
                    response => {
                        this.router.navigate([
                            "/important/" + this.year + "/" + this.month
                        ]);
                    },
                    error => {
                        this.displayError(error);
                    }
                );
        }
    }

    private initForm(startDate: string, postedOn: string) {
        const id = this.id;
        const title = this.title;
        const body = this.body;

        this.extraordinaryForm = new FormGroup({
            id: new FormControl(id),
            title: new FormControl(title, [Validators.required, Validators.maxLength(40)]),
            body: new FormControl(body, [Validators.required, Validators.maxLength(255)]),
            startDate: new FormControl(startDate, Validators.required),
            postedOn: new FormControl(postedOn, Validators.required)
        });

        if (this.editMode) {
            this.extraordinaryService
                .getExtraordinaryByid(this.username, this.id)
                .subscribe(
                    extra => {
                        this.extraordinaryForm.setValue({
                            "id": this.id,
                            "title": extra.title,
                            "body": extra.body,
                            "startDate": extra.startDate,
                            "postedOn": this.datepipe.transform(
                                new Date(), DETAIL_DATE_FORMAT
                            )
                        });
                    },
                    error => {
                        this.displayError(error);
                    }
                );

            this.startDate = this.datepipe.transform(new Date(), DATE_FORMAT);
            this.postedOn = this.datepipe.transform(new Date(), DETAIL_DATE_FORMAT);
        }
    }

    private displayError(error) {
        this.messagesService.displayError(error, this.extraordinaryForm);
    }
}
