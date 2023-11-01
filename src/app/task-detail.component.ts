import { Injectable, OnInit, Output, EventEmitter } from "@angular/core";
import { TaskService } from "./services/task.service";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "./auth/authentication.service";
import { Task } from "./task.model";
import { MessagesService } from "./services/data/messages.service";

@Injectable()
export class TaskDetailComponent implements OnInit {

	id: number;
	num: number;
	username: string;
	returnUrl: string;
	month: number;
	year: number;
	date: Date;
	target: string;

	task: Task;

	// *****
	@Output()
	dataChangedEvent = new EventEmitter();
	// *****

	constructor(
		private route: ActivatedRoute,
		private service: TaskService,
		private authService: AuthenticationService,
        private messagesService: MessagesService
	) {
	}

	ngOnInit() {
		this.username = this.authService.getAuthenticatedUser();
		this.route.params.subscribe(params => {
			this.id = +params["id"];
			this.num = +params["num"];
		});
		this.date = new Date();
		this.month = this.date.getMonth() + 1;
		this.year = this.date.getFullYear();
		this.returnUrl = "/important/" + this.year + "/" + this.month;
		this.service
			.getTask(this.username, this.target, this.num, this.id)
			.subscribe(
				data => {
					console.log('******************');
					console.log(JSON.stringify(data));
					this.task = data;
					this, this.dataChangedEvent.emit();
				},
				error => {
                    this.displayError(error, this.returnUrl);
				}
			);
	}

	public setTarget(target: string) {
		this.target = target;
	}

    private displayError(error, returnUrl: string) {
        this.messagesService.displayErrorWithReturnUrl(error, returnUrl);
    }
}
