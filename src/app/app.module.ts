import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthenticationComponent} from './components/authenticaton/authentication.component';
import {ArticleListComponent} from './components/article-list/article-list.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {ArticlesService} from './services/articles.service';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [ArticlesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
