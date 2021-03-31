import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IUserService } from './i-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private userService: IUserService) { }

  canActivate(
    _: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean {
    const isAuth = this.userService.isAuth
    if (!isAuth) {
      this.router.navigate(['login'])
    }

    return isAuth
  }
}
