import {Injectable} from "@angular/core";
import {AngularFirestore} from '@angular/fire/firestore'
import {map, take} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";

export interface Post {
  id?: string;
  text: string;
}

@Injectable()
export class ArticlesService {
  constructor(private angularFirestore: AngularFirestore) {
  }

  createPost(post: Post) {
    return fromPromise(this.angularFirestore.collection<Post>('posts').add(post)).pipe(take(1))
  }

  getPosts() {
    return this.angularFirestore.collection<Post[]>('posts').snapshotChanges().pipe(map(data => {
      return data.map((_post) => {
        const post = _post.payload.doc;

        return {
          id: post.id,
          ...post.data(),
        }
      })
    }))
  }

  deletePost(post: Post) {
    return fromPromise(this.angularFirestore.collection<Post>('posts').doc(post.id).delete())
  }

  updatePost({id, ...post}: Post) {
    return fromPromise(this.angularFirestore.collection<Post>('posts').doc(id).set(post, { merge: true })).pipe(take(1))
  }
}
