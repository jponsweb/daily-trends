import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticleComponent } from './articles/add-article/add-article.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { UpdateArticleComponent } from './articles/update-article/update-article.component';



const routes: Routes = [
  { path: '', component: ArticleListComponent},
  { path: 'update', component: UpdateArticleComponent},
  { path: 'create', component: AddArticleComponent},
  { path: ':articleId', component: ArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
