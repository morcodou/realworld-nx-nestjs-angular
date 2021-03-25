import { Injectable } from '@angular/core';
import { ILoginUser } from '@realworld/user/api-interfaces';
import { IUserService } from './i-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUIService {
  constructor(private userService: IUserService) { }

  login(data: ILoginUser) {
    return this.userService.login(data)
  }
}
