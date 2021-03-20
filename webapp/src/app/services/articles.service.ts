import { Injectable } from '@angular/core';
import { Article } from "../articles/article.model";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment'

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private article: Article[] = [];
 
  private articleUpdated = new Subject<Article[]>();
  public err = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

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

  getArticles() {
    this.http.get<{ message: string; articles: any }>(API_URL)
      .pipe(
        map(articleData => {
          return articleData.articles.map(article => {
            return {
              id: article._id,
              title: article.title,
              body: article.body,
              image: article.image,
              source: article.source,
              publisher: article.publisher
            };
          });
        })
      )
      .subscribe(transformedArticles => {
        this.err.next(null)

        this.article = transformedArticles;
        this.articleUpdated.next([...this.article]);
      },
        err => {
          this.err.next(err)
        });
  }

  getArticle(id: string) {
    return this.http.get<{
      id: string,
      title: string,
      body: string,
      image: string,
      source: string,
      publisher: string
    }>(
      API_URL +"/" + id
    );
  }

  updatePost(id: string, title: string, body: string, image: string, source:string, publisher: string) {
    let articleData: Article | FormData;

    articleData = {
      id: id,
      title: title,
      body: body,
      image: image,
      source: source,
      publisher: publisher
    };

    this.http
      .put(API_URL + "/" +id, articleData)
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
        const updatedArticles = this.article.filter(article => article.id !== articleId);
        this.article = updatedArticles;
        this.articleUpdated.next([...this.article]);
      },
        e => {
          this.err.next(e)

        });
  }

}
