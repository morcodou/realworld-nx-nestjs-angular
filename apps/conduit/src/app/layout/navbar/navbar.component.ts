import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IUser } from '@realworld/user/api-interfaces';

@UntilDestroy()
@Component({
  selector: 'realworld-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() isAuth: boolean
  @Input() user: IUser
}
