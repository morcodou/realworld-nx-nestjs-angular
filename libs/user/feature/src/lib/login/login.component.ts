import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { AuthUIService } from '@realworld/user/shared';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup

  get control() {
    return {
      email: this.form.get('email'),
      password: this.form.get('password'),
    }
  }

  constructor(
    private authUIService: AuthUIService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { 
    this.initForm()
  }

  ngOnInit() {
    this.title.setTitle("Sign in")
  }

  private initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, CustomValidators.email]],
      password: [null, [Validators.required]]
    })
  }

  login() {
    this.authUIService.login(this.form.value)
      .subscribe(_ => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
        this.router.navigateByUrl(returnUrl)
      })
  }

}
