import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthorizationGuard{

  constructor(private authService : AuthenticationService, private router : Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let authorize = false
    let authorizeRoles : string[] = route.data['roles']
    let roles : string[] = this.authService.roles as string[]
    for (let i = 0; i < roles.length; i++){
      if (authorizeRoles.includes(roles[i])){
        authorize =  true
      }
    }
    return authorize

  }

}

