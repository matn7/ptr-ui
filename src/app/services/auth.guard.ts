import { Injectable } from "@angular/core";
import {
  Router,
  CanLoad,
  Route,
  UrlSegment
} from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): 
  boolean | Observable<boolean> | Promise<boolean> {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    return false;
  }
}
