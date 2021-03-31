import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '@realworld/article/api-interfaces';
import { IArticleService } from '@realworld/article/shared';
import { ActionSuccessResponse } from '@realworld/shared/client-server';
import { IUserService } from '@realworld/user/shared';
import { take } from 'rxjs/operators';

@Component({
  selector: 'realworld-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  form: FormGroup

  constructor(
    public userService: IUserService,
    private articleService: IArticleService,
    private router: Router, 
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private title: Title
  ) {
    this.initForm()
  }

  async ngOnInit() {
    this.title.setTitle('Realworld - New article')
    const slug = this.route.snapshot.params['slug']
    if (slug) {
      if (history?.state?.data) {
        this.form.patchValue(this.processArticleResponse(history.state.data))
      } else {
        await this.loadArticle(slug)
      }
      this.title.setTitle('Realworld - Edit article ' + this.form?.get('title')?.value)

      this.form.get('tagList').disable()
    }
  }

  async loadArticle(slug: string) {
    try {
      let res = await this.articleService.getOne(slug).pipe(take(1)).toPromise()
      if (res && res.detailData) {
        this.form.patchValue(this.processArticleResponse(res.detailData as IArticle))
      } else {
        this.router.navigate(['/'])
      }
    } catch (error) {
      this.router.navigate(['/'])
      throw error
    }
  }

  private initForm() {
    this.form = this.fb.group({
      slug: [null],
      title: [null, [Validators.required, Validators.maxLength(200)]],
      description: [null, [Validators.required, Validators.maxLength(255)]],
      body: [null, [Validators.required, Validators.maxLength(2000)]],
      tagList: [null, [Validators.maxLength(255)]],
    })
  }

  async submit() {
    const data = this.processFormValue(this.form.value)

    let promise: Promise<ActionSuccessResponse<IArticle>>
    if (data.slug) {
      promise = this.articleService.update(this.form?.value?.slug, data as any).pipe(take(1)).toPromise()
    } else {
      promise = this.articleService.create(data).pipe(take(1)).toPromise()
    }

    const res = await promise
    this.router.navigateByUrl(`/article/${res?.data?.slug}`, {state: res?.data})
  }

  private processArticleResponse(article: IArticle): any {
    if (article.tagList) {
      article.tagList = article.tagList.join(', ') as any
    }
    return article
  }

  private processFormValue(f): IArticle {
    let article = {...f}
    if (article.tagList) {
      article.tagList = (article.tagList as string).split(',').map(t => t.trim())
    }
    if (!article.slug) {
      delete article.slug
    }
    return article
  }
}
