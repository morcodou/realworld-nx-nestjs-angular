import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IUserService } from './i-user.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuardService implements CanActivate {

  constructor(private router: Router, private userService: IUserService) { }

  canActivate(
    _: ActivatedRouteSnapshot, 
    __: RouterStateSnapshot
  ): boolean {
    if (this.userService?.isAuth) {
      this.router.navigate(['/'])
    }
    return !this.userService?.isAuth
  }
}
