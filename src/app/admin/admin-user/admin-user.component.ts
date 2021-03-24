import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../services/admin/admin-user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ErrorService } from '../../services/data/error.service';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  username: string;
  userData: any;
  // userData2: User;
  returnUrl: string;
  usersData: User[];
  records: Array<number>;

  constructor(
    private userService: AdminUserService,
    private authService: AuthenticationService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.username = this.authService.getAuthenticatedUser();

    this.returnUrl = "/user/" + this.username;

    this.userData = this.userService
    .getAllUserDetails()
    .subscribe(
      data => {
        console.log(data);
        this.userData = data;
        this.usersData = data;
        this.records = Array(this.usersData.length)
          .fill(0)
          .map((x, i) => i);
      },
      error => {
        this.errorService.displayMessage(error, this.returnUrl);
      }
    );
  }

}
