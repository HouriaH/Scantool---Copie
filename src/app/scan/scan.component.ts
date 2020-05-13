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
  product_name = '';
  nutriscore_grade = '';
  countries = '';
  image_front_url = '';
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
      (value) => {
        console.log('article created, ', value);
        this.createArticle.emit(value)
      },
      (error) => console.error('error while creating article', error)
    );
  }

  onValueChange(codebar: string) {
    this.articleService.getData(codebar).subscribe(
      (result: any) => {
        console.log('result:', result);
      //   this.articleForm.patchValue({
      //     Code: codebar
      //  });
        if (result.product.product_name) {
          this.articleForm = result.product.product_name; // update formbuilder product name info
        //   this.articleForm.patchValue({
        //     product_name: result.product.product_name
        //  });
        }
        if (result.product.nutriscore_grade) {
          this.nutriscore_grade = result.product.nutriscore_grade; // update formbuilder product nutriscore grade info
        //   this.articleForm.patchValue({
        //     nutriscore_grade: result.product.nutriscore_grade
        //  });
        }
        if (result.product.countries) {
          this.countries = result.product.countries; // update formbuilder product country info
        //   this.articleForm.patchValue({
        //     countries: result.product.countries
        //  });
        }
        if (result.product.image_front_url) {
          this.image_front_url = result.product.image_front_url; // update formbuilder product image info
        }
      }, (err) => {
        console.log(err);
      }
    )
  }
}

