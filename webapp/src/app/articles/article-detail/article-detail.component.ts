import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  isloading = false;
  url: string
  error: any
  articleId: string;
  article: Article;

  constructor(
    public articleService: ArticlesService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.url = this.router.url.split("/")[1]
    
    this.getErrors()

    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has("articleId")) {
        this.articleId = paramMap.get("articleId");
        this.getArticleById(this.articleId)
      }
    })
  }

  getErrors() {
    this.error = null
    this.articleService.err.subscribe(err => {
      this.error = err
      this.isloading = false

    })

  }

  getArticleById(_id) {
    this.isloading = true
    this.articleService.getArticle(this.articleId).subscribe(articleData => {
      console.log(articleData)
      this.article = {
        _id: articleData._id,
        title: articleData.title,
        body: articleData.body,
        image: articleData.image,
        source: articleData.source,
        publisher: articleData.publisher
      };
      this.isloading = false
    })
    e => {
      this.isloading = false
      this.error = e
    }
  }



  OnDelete(postId: string) {
    this.articleService.deleteArticle(postId);
  }

}
