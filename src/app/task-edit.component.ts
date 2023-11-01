import {
    Component,
    OnInit,
    Output
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { TaskService } from "./services/task.service";
import { AuthenticationService } from "./auth/authentication.service";
import { TimeService } from "./services/data/time.service";
import {
    DETAIL_DATE_FORMAT, DATE_FORMAT, VALID_NUMS
} from "./app.constants";
import { EventEmitter } from "events";
import { MessagesService } from "./services/data/messages.service";

@Component({
    template: ''
})
export class TaskEditComponent implements OnInit {
    // One window for create new and edit
    editMode = false;

    // Task data fields
    id: number;
    title: string;
    body: string;
    made: number;
    importantForm: FormGroup;
    date: Date;
    username: string;
    startDate: string;
    postedOn: string;
    messages: string[] = [];

    // Task number fields number [1,2,3], target [important, lessimportant] 
    num: number;

    target: string;

    // Calendar data
    day: number;
    month: number;
    year: number;
    today: number;
    returnUrl: string;

    @Output()
    dataChangedEvent = new EventEmitter();

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
        private datepipe: DatePipe,
        private authService: AuthenticationService,
        private router: Router,
        private timeService: TimeService,
        private messagesService: MessagesService
    ) {
    }

    ngOnInit() {
        this.username = this.authService.getAuthenticatedUser();
        this.date = new Date();
        this.month = this.date.getMonth() + 1;
        this.year = this.date.getFullYear();

        this.dataChangedEvent.emit('important');

        this.returnUrl = "/" + this.target + "/" + this.year + "/" + this.month;

        this.route.params.subscribe((params: Params) => {
            this.id = +params["id"];
            this.editMode = params["id"] != null;
            this.num = +params["num"];
        }, error => {
            this.displayError(error);
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
        console.log("==================");
        console.log(this.id);
        console.log(this.num);
        console.log(VALID_NUMS[this.num]);
        if (VALID_NUMS[this.num] == undefined) {
            console.log("Caught URL modyfication");
            this.messages.push("Please do not change URL bar");
            this.messagesService.emitUiMessage(this.messages);
            this.router.navigate([this.returnUrl]);
            return;
        }
        // Initialize hidden form fields
        this.initForm(this.startDate, this.postedOn);
    }

    onSubmit() {
        if (this.editMode) {
            this.taskService
                .updateTask(
                    this.username,
                    this.target,
                    this.num,
                    this.importantForm.value
                )
                .subscribe(
                    response => {
                        this.router.navigate([
                            "/" + this.target + "/" + this.num + "/" + response["id"] + "/view"
                        ]);
                    },
                    error => {
                        this.displayError(error);
                    }
                );
        } else {
            this.taskService
                .createTask(this.username, this.target, this.num, this.importantForm.value)
                .subscribe(
                    response => {
                        this.router.navigate([
                            "/" + this.target + "/" + this.num + "/" + response["id"] + "/view"
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
            this.taskService
                .deleteTask(this.username, this.target, this.num, this.id)
                .subscribe(
                    response => {
                        this.router.navigate([
                            "/" + this.target + "/" + this.year + "/" + this.month
                        ]);
                    },
                    error => {
                        this.displayError(error);
                    }
                );
        }
    }

    setTarget(target: string) {
        this.target = target;
    }

    private initForm(startDate: string, postedOn: string) {
        const id = this.id;
        const title = this.title;
        const body = this.body;
        const made = this.made;
        console.log("initForm");

        this.importantForm = new FormGroup({
            id: new FormControl(id),
            title: new FormControl(title, [Validators.required, Validators.maxLength(40)]),
            body: new FormControl(body, [Validators.required, Validators.maxLength(255)]),
            made: new FormControl(made, Validators.required),
            startDate: new FormControl(startDate, Validators.required),
            postedOn: new FormControl(postedOn, Validators.required)
        });

        if (this.editMode) {

            this.taskService
                .getTask(this.username, this.target, this.num, this.id)
                .subscribe(
                    important => {
                        this.importantForm.setValue({
                            "id": this.id,
                            "title": important.title,
                            "body": important.body,
                            "made": important.made,
                            "startDate": important.startDate,
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
        this.messagesService.displayError(error, this.importantForm);
    }
}
