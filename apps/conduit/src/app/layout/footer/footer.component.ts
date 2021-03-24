import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ISetting } from '@realworld/setting/api-interfaces';
import { IPolicy } from '@realworld/policy/api-interfaces';

@Component({
  selector: 'realworld-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Input()
  setting: ISetting
  @Input()
  policies: IPolicy[]
  @Input()
  menuItems: any[]

  currentYear = new Date().getFullYear()
}
