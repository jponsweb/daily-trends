import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { AddArticleComponent } from './articles/add-article/add-article.component';
import { DeleteArticleComponent } from './articles/delete-article/delete-article.component';
import { UpdateArticleComponent } from './articles/update-article/update-article.component';
import { ArticlesService } from "./services/articles.service";
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticleListComponent,
    AddArticleComponent,
    DeleteArticleComponent,
    UpdateArticleComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ArticlesService,HttpErrorHandler,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
