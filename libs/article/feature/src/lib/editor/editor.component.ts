import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '@realworld/article/api-interfaces';
import { IArticleService } from '@realworld/article/shared';
import { ActionSuccessResponse } from '@realworld/shared/client-server';
import { IUserService } from '@realworld/user/shared';

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
    private fb: FormBuilder
  ) {
    this.initForm()
  }

  ngOnInit() {
    const slug = this.route.snapshot.params['slug']
    if (slug) {
      if (history?.state?.data) {
        this.form.patchValue(this.processArticleResponse(history.state.data))
      } else {
        this.loadArticle(slug)
      }
    }
  }

  async loadArticle(slug: string) {
    try {
      let res = await this.articleService.getOne(slug).toPromise()
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
      id: [null],
      title: [null, [Validators.required, Validators.maxLength(200)]],
      description: [null, [Validators.required, Validators.maxLength(255)]],
      body: [null, [Validators.required, Validators.maxLength(2000)]],
      tagList: [null, [Validators.maxLength(255)]],
    })
  }

  async submit() {
    const data = this.processFormValue(this.form.value)

    let promise: Promise<ActionSuccessResponse<IArticle>>
    if (data.id) {
      promise = this.articleService.update(data as any).toPromise()
    } else {
      promise = this.articleService.create(data).toPromise()
    }

    const res = await promise
    this.router.navigateByUrl(`/article/${res?.data?.slug}`, {state: res?.data})
  }

  private processArticleResponse(article: IArticle): any {
    article.tagList = article.tagList.join(', ') as any
    return article
  }

  private processFormValue(f): IArticle {
    let article = {...f}
    article.tagList = (article.tagList as string).split(',').map(t => t.trim())
    if (!article.id) {
      delete article.id
    }
    return article
  }
}
