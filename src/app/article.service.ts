import { Injectable } from '@angular/core';
import { Article } from './article/article.class';
import {HttpClient} from "@angular/common/http";
import { Observable, forkJoin } from 'rxjs';


@Injectable()
export class ArticleService {

  constructor(private http : HttpClient) { }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/list-article");
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/list-article/${id}`);
  }

  public deleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(`http://localhost:3000/list-article/${id}`);
  }

  public addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`http://localhost:3000/list-article`,article);
  }

  public filterArticle(filter: string): Observable<Article[]> {
    return this.http.get<Article[]>(`http://localhost:3000/list-article?q=${filter}`);
  }
 
  public getData(code: string){
    return this.http.get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
  }
}
