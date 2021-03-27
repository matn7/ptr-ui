import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from "../auth/authentication.service";

@Injectable({
  providedIn: "root"
})
export class RouteGuardService implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    console.log("Tju");
    sessionStorage.setItem("returnUrl", state.url);
    this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
