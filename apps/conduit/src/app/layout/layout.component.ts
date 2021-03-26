import { Component } from '@angular/core';
import { IUserService } from '@realworld/user/shared';

@Component({
  selector: 'realworld-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'] 
})
export class LayoutComponent {
  constructor(public userService: IUserService) {
    
  }
}
