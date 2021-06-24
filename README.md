## Angular + Firebase + Authentication guide.

### Tools: @angular/cli, rxjs, firebase, @angular/fire   

### Preparing:

1. Create Angular Project using  @angular/cli

    ```ng new firebase-angular-tutorial```


2. Install ```firebase``` and ```@angular/fire``` packages for connecting angular app and firebase

    ```npm i firebase @angular/fire```

3. Creating Firebase Project 
  + login to the [firebase](https://firebase.google.com/) 
  + open [console](https://console.firebase.google.com/)  and click "Add project" button
  + enter project name (firebase-angular-tutorial) => continue
  + optional you can enable/disable Google Analytics (I prefer disable) => create project and wait and click => continue
  + now you located on firebase console, navigate to left sidebar and chose authentication tab => click get started => Sign-in method tab => find Google option  => enable it (enter your email) => save
  + look at left sidebar menu and and click 'Firestore Database' => create database => Start in test mode => choose cloud firestore location (eur3) => enable
  + Chose Project overview (Under Firebase logo) and add Web app => enter name (web-app) => register app => continue to console
  + navigate to Project overview and click settings icon and choose Project Settings 
  
  + on General tab scroll down and find your app (in my case web-app), set Config in SDK setup and configuration and copy firebaseConfig to your local project/environments/environment.ts
  
  + import environment, AngularFireModule (from @angular/fire) and AngularFirestoreModule(from @angular/fire/firestore) into app.module.ts

  + add to module imports: 
    ```
    [
      ...
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule
    ]
    ```

4) Create authentication service : 
    ```ts
    import { Injectable } from '@angular/core';
    import { AngularFireAuth } from '@angular/fire/auth';
    import firebase from 'firebase';
    import auth = firebase.auth;
    
    @Injectable({
      providedIn: 'root'
    })
    export class AuthenticationService {
    
      constructor(private firebaseAuthentication: AngularFireAuth) { }
    
      authenticateWithGoogle() {
        const authenticationProvider = new auth.GoogleAuthProvider();
        return this.firebaseAuthentication.signInWithPopup(authenticationProvider);
      }
    
      signOut() {
        return this.firebaseAuthentication.signOut();
      }
    }
    ```

    and use 'authenticateWithGoogle()' for login with your account

5) Create **CRUD service** and use angularFireStore for CRUD operation. 
  + **ADD**: 
   
    for Adding item to firebase need to call method collection with collection name as argument:
    ```js
    this.angularFirestore.collection<Collection>('posts').add(newPost)
    ```

  + **Get** Posts:
    
    **warning**: format data that we received has specific structure. Use map to transform data:
    ```ts
    this.angularFirestore.collection<Post[]>('posts').snapshotChanges().pipe(map(data => data.map(_post => ({
      id: _post.payload.doc.id,
      ..._post.payload.doc.data(),
    })
    ```
  + **Update** Post:
    ```ts 
    this.angularFirestore.collection<Post>('posts').doc(id).set(post, { merge: true })
    ```

  + **Delete** Post:
    ```ts
    this.angularFirestore.collection<Post>('posts').doc(post.id).delete()
    ```


    

