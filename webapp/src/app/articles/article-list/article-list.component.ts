import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];
  isloading = false;
  error: any
  private articlesSub: Subscription;

  constructor(private as: ArticlesService) { }

  ngOnInit(): void {
    this.getErrors()
    this.isloading = true
    this.as.getArticles()
    
    this.articlesSub = this.as.getArticleUpdateListener()
      .subscribe((articles: Article[]) => {
        
        this.isloading = false;
        this.articles = articles;
        console.log("articles is", this.articles)
      }, e => {
        this.isloading = false;
        this.error = e
      });
  }

  getErrors() {
    this.error = null
    this.as.err.subscribe(err => {
      this.error = err
      this.isloading = false
    })
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
  }

}
