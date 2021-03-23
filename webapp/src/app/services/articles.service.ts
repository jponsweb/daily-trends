import { Injectable } from '@angular/core';
import { Article } from "../articles/article.model";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {environment} from '../../environments/environment'
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private article: Article[] = [];
 
  private articleUpdated = new Subject<Article[]>();
  public err = new BehaviorSubject<any>(null);
  private handleError: any;

constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ArticlesService');
  }

  getArticleUpdateListener() {
    return this.articleUpdated.asObservable();
  }

  addArticle(title: string, body: string, image: string, source:string, publisher: string) {
    const articleData = new FormData();
    articleData.append("title", title);
    articleData.append("body", body);
    articleData.append("image", image);
    articleData.append("source", source);
    articleData.append("publisher", publisher);
    this.http
      .post<{ message: string; article: Article }>(
        API_URL,
        articleData
      )
      .subscribe(responseData => {
        this.err.next(null)
      }),
      err => {
        this.err.next(err)
      }
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(API_URL)
     .pipe(
        catchError(this.handleError('getArticles', []))
      );
  }

  getArticle(_id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      body: string,
      image: string,
      source: string,
      publisher: string
    }>(
      API_URL +"/" + _id
    );
  }

  updatePost(_id: string, title: string, body: string, image: string, source:string, publisher: string) {
    let articleData: Article | FormData;

    articleData = {
      _id: _id,
      title: title,
      body: body,
      image: image,
      source: source,
      publisher: publisher
    };

    this.http
      .put(API_URL + "/" +_id, articleData)
      .subscribe(response => {
        this.err.next(null)
      },
        err => {
          this.err.next(err)
        });
  }

  deleteArticle(articleId: string) {
    this.http
      .delete(API_URL +"/"+ articleId)
      .subscribe((data) => {
        this.err.next(null)
        const updatedArticles = this.article.filter(article => article._id !== articleId);
        this.article = updatedArticles;
        this.articleUpdated.next([...this.article]);
      },
        e => {
          this.err.next(e)

        });
  }

}
