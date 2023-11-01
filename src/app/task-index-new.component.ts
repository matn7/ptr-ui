import { OnInit, Input, Directive } from "@angular/core";
import { AMBER_COMPLETION_STYLES, YELLOW_COMPLETION_STYLES, GREEN_COMPLETION_STYLES, BLUE_COMPLETION_STYLES } from "./app.constants";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "./auth/authentication.service";
import { TimeService } from "./services/data/time.service";
import { ErrorService } from "./services/data/error.service";
import { WeekDay } from "@angular/common";
import { TaskServiceInterface } from "./services/task.service-interface";
import { IndexData } from "./services/index-class-interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Directive()
export abstract class TaskIndexNewComponent implements OnInit {
    @Input() index: number = 0;

    selectDate: FormGroup;
    username: string;
    indexData: IndexData[];
    month: number;
    year: number;
    returnUrl: string;
    monthDaysArr: Array<number>;
    weekDayArr: Array<string>;
    lengthOfMonth: number;
    today: number;
    date: Date;
    target: string;

    readonly amber_navigate_styles = AMBER_COMPLETION_STYLES;
    readonly yellow_completion_styles = YELLOW_COMPLETION_STYLES;
    readonly green_completion_styles = GREEN_COMPLETION_STYLES;
    readonly blue_completion_styles = BLUE_COMPLETION_STYLES;

    constructor(
        private route: ActivatedRoute,
        private taskServiceInterface: TaskServiceInterface,
        private authService: AuthenticationService,
        private timeService: TimeService,
        private router: Router,
        private errorService: ErrorService,
        target: string,
        indexData: IndexData[]
    ) {
        this.target = target;
        this.indexData = indexData;
    }

    ngOnInit() {
        // Get date from URL
        this.route.params.subscribe(params => {
            this.month = +params["month"];
            this.year = +params["year"];
        });

        // Prepare day number and week day arrays
        this.prepareMonthDaysArray();

        this.today = new Date().getDay();
        this.date = new Date();

        this.today = this.timeService.getActiveDay(
            this.month,
            this.year,
            this.date
        );

        this.username = this.authService.getAuthenticatedUser();
        this.returnUrl = "/" + this.target + "/" + this.year + "/" + this.month;

        this.taskServiceInterface
            .getTaskIndexData(this.username, this.target, this.year, this.month)
            .subscribe(
                (data) => {
                    this.indexData = data;
                    this.processData();
                },
                error => {
                    this.errorService.displayMessage(error, this.returnUrl);
                }
            );

        this.initForm();
    }

    abstract processData();

    onSubmit() {
        this.year = this.selectDate.value.selectYear;
        this.month = this.selectDate.value.selectMonth;

        this.prepareMonthDaysArray()

        // clear index data
        this.today = this.timeService.getActiveDay(
            this.month,
            this.year,
            this.date
        );

        this.taskServiceInterface
            .getTaskIndexData(this.username, this.target, this.year, this.month)
            .subscribe(
                data => {
                    this.indexData = data;
                    console.log("Click");
                    this.processData();
                },
                error => {
                    this.errorService.displayMessage(error, this.returnUrl);
                }
            );

        this.router.navigate(["/" + this.target + "/" + this.year + "/" + this.month]);
    }

    private prepareMonthDaysArray() {
        this.lengthOfMonth = new Date(this.year, this.month, 0).getDate();

        //   this.monthDaysArr = Array(this.lengthOfMonth)
        //   .fill(0)
        //   .map((x, i) => i);

        // this.weekDayArr = Array(this.lengthOfMonth)
        //   .fill(0)
        //   .map(
        //     (x, i) => WeekDay[new Date(this.year, this.month - 1, i).getDay()]
        // );

        this.monthDaysArr = Array(this.lengthOfMonth)
            .fill(0)
            .map((x, i) => i + 1);

        this.weekDayArr = Array(this.lengthOfMonth)
            .fill(0)
            .map(
                (x, i) => WeekDay[new Date(this.year, this.month - 1, i + 1).getDay()]
            );
    }

    onAddExtraordinaryClick(year, month, day) {
        this.router.navigate([
            "/extraordinary/" + year + "/" + month + "/" + day + "/new"
        ]);
    }

    onEditExtraordinaryClick(id) {
        this.router.navigate(["/extraordinary/" + id + "/edit"]);
    }

    onAddNewClick(target, num, year, month, day) {
        this.router.navigate([
            "/" + target + "/" + num + "/" + year + "/" + month + "/" + day + "/new"
        ], { replaceUrl: false });
    }

    onEditClick(target, num, id) {
        this.router.navigate(["/" + target + "/" + num + "/" + id + "/edit"]);
    }

    onAddDayClick(year, month, day) {
        this.router.navigate(["/days/" + year + "/" + month + "/" + day + "/new"]);
    }

    onEditDayClick(id) {
        this.router.navigate(["/days/" + id + "/edit"]);
    }

    private initForm() {
        const selectYear = this.year;
        const selectMonth = this.month;

        this.selectDate = new FormGroup({
            selectYear: new FormControl(selectYear, Validators.required),
            selectMonth: new FormControl(selectMonth, Validators.required)
        });
    }
}
