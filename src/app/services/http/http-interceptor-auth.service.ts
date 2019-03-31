import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { AuthenticationService } from "../authentication.service";

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorAuthService implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authHeaderString = this.authenticationService.getAuthenticatedToken();
    const username = this.authenticationService.getAuthenticatedUser();

    if (authHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: authHeaderString
        }
      });
    }

    return next.handle(request);
  }
}
