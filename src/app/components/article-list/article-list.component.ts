import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ArticlesService, Post } from 'src/app/services/articles.service';


const INITIAL_POST = {
  text: ''
};

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  public post: Post = { ...INITIAL_POST };
  public posts: any = [];
  public editMode = false;

  constructor(private authenticationService: AuthenticationService, private articlesService: ArticlesService, private router: Router) {}

  ngOnInit(): void {
    this.articlesService.getPosts().subscribe((posts: any) => {
      this.posts = posts;
    })
  }

  addPost() {
    this.articlesService.createPost(this.post).subscribe(res => {
      alert('Post Added')
    });
  }

  signOut() {
    this.authenticationService.signOut()
      .then(() => {
        this.router.navigate(['login'])
      });
  }

  updatePost(post: Post) {
    this.articlesService.updatePost(post)
  }

  onUpdatePostClick(post: Post) {
    this.editMode = true;
    this.post = { ...post };
  }

  deletePost(post: Post) {
    this.articlesService.deletePost(post).subscribe(() => {
      alert('Deleted')
    })
  }

  onPostSubmit() {
    this.editMode = false;
    this.editMode ? this.addPost() : this.updatePost(this.post)
    this.post = { ...INITIAL_POST }
  }
}
