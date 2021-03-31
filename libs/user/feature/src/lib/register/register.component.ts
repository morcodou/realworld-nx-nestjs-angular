import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IUserService } from '@realworld/user/shared';
import { CustomValidators } from 'ngx-custom-validators';
import { take } from 'rxjs/operators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup

  get control() {
    return {
      email: this.form.get('email'),
      password: this.form.get('password'),
      confirmedPassword: this.form.get('confirmedPassword')
    }
  }

  constructor(
    private userService: IUserService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title
  ) { 
    this.initForm()
  }

  ngOnInit() {
    this.title.setTitle("Sign up")
  }

  private initForm() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(60)]],
      email: [null, [Validators.required, CustomValidators.email, Validators.maxLength(60)]],
      password: [null, [Validators.required, Validators.maxLength(200)]],
    })
  }

  async submit() {
    await this.userService.register(this.form.value).pipe(take(1)).toPromise()
    this.router.navigate(['/'])
  }

}
