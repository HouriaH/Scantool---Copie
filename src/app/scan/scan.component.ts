import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArticleService } from '../article.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Article} from '../article/article.class';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  @Output('articleCreated')
  createArticle: EventEmitter<Article> = new EventEmitter<Article>();

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder) {
    this.articleForm = this.fb.group({
    Code: ['', Validators.nullValidator ],
    product_name: ['', Validators.required],
    countries:['', Validators.required],
    nutriscore_grade:['',Validators.required],
  });
  }

  articleForm: FormGroup;
  value: string;
  isError = false;

  ngOnInit(): void {
  }

  onError(error) {
    console.error(error);
    this.isError = true;
  }

  create() {
    this.articleService.addArticle(this.articleForm.value).subscribe(
      (value) => this.createArticle.emit(value),
      (error) => console.error('error while creating article', error)
    );
  }
}

