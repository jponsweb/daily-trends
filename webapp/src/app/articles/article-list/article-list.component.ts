import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-list',
  providers: [ArticlesService],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];
  isloading = false;
  error: any

  constructor(private as: ArticlesService) { }

  ngOnInit(): void {
    this.getArticles();
  }

    getArticles(): void {
      this.as.getArticles()
      .subscribe(articles => (this.articles = articles));
  }

  getErrors() {
    this.error = null
    this.as.err.subscribe(err => {
      this.error = err
      this.isloading = false
    })
  }

}
