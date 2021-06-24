import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authenticaton/authentication.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectAuthorizedToMain = () => redirectLoggedInTo(['main']);

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent,

    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectAuthorizedToMain }
  },
  { path: 'main',  component: ArticleListComponent,

    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
