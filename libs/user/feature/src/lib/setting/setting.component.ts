import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserService } from '@realworld/user/shared';
import { CustomValidators } from 'ngx-custom-validators';
import { take } from 'rxjs/operators';

@Component({
  selector: 'realworld-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  form: FormGroup

  constructor(
    private userService: IUserService, 
    private router: Router,
    private fb: FormBuilder,
    private title: Title
  ) { 
    this.initForm()
  }

  async ngOnInit() {
    this.title.setTitle('Realworld - View Settings')
    const user = (await this.userService.getCurrentUser().pipe(take(1)).toPromise())?.detailData
    this.form.patchValue(user)
  }

  logout() {
    this.userService.logout()
    this.router.navigate(['/'])
  }

  private initForm() {
    this.form = this.fb.group({
      image: [null, [CustomValidators.url, Validators.maxLength(255)]],
      username: [null, [Validators.required, Validators.maxLength(60)]],
      bio: [null, [Validators.maxLength(1000)]],
      email: [null, [Validators.required, Validators.maxLength(60), CustomValidators.email]],
      password: [null, [Validators.maxLength(200)]],
    })
  }

  async update() {
    await this.userService.update(null, this.form.value).pipe(take(1)).toPromise()
  }

}
