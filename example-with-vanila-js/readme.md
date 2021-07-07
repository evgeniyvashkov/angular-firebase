1. Creating Firebase Project 
  + login to the [firebase](https://firebase.google.com/) 
  + open [console](https://console.firebase.google.com/)  and click "Add project" button
  + enter project name (firebase-angular-tutorial) => continue
  + optional you can enable/disable Google Analytics (I prefer disable) => create project and wait and click => continue
  + now you located on firebase console, navigate to left sidebar and chose authentication tab => click get started => Sign-in method tab => find Google option  => enable it (enter your email) => save
  + look at left sidebar menu and and click 'Firestore Database' => create database => Start in test mode => choose cloud firestore location (eur3) => enable
  + Chose Project overview (Under Firebase logo) and add Web app => enter name (web-app) => register app => continue to console
  + navigate to Project overview and click settings icon and choose Project Settings 
  
  + on General tab scroll down and find your app (in my case web-app), set Config in SDK setup and configuration and copy firebaseConfig to your local project/environments/environment.ts
  
2. Setup project:
  + Include scripts:
  **Warning: make sure that you project is running on localhost:port number** (webstorm starts automatically, if VS Code use Live Server extension)
  ```js
    <script src="https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.7.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.7.0/firebase-firestore.js"></script>
  ```

  + Init app with configuration:
    ```js
      const firebaseConfig = {
        apiKey: "AIzaSyBWU-epHDG3P4-2pwUW6Z3suiTLBNHcKlQ",
        authDomain: "my-project-abd93.firebaseapp.com",
        projectId: "my-project-abd93",
        storageBucket: "my-project-abd93.appspot.com",
        messagingSenderId: "458568985532",
        appId: "1:458568985532:web:e5025c244cfbf465b359b9"
      };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    ```
3. Authentication setup:
  + **Sign In**:
  ```js
    const provider = new firebase.auth.GoogleAuthProvider();

    function signIn() {
      firebase.auth().signInWithPopup(provider)
        .then(res => {
          console.log(`You have been signed on as ${res.user.displayName}`)
          initApp();
        }).catch(err => {
          console.log('Oops ...')
        });
    }
  ```
  
  + **Sign out**:
  ```js
    function signOut() {
      firebase.auth().signOut().then(() => {
      ...
    })  
  }
  ```

  + **Keep User Logged**:
  ```js
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      ...
    } else {
      ...
    }
  })
  ```

4. CRUD operations  with Firestore:
  + **Get**:
  ```ts
      function getData() {
        firestore.collection('posts')
          .get()
          .then(response => {
            const posts = response.docs.map(post => ({id: post.id, ...post.data()}));
            ...
      }
  ```

  + **Add**:
  ```js
    function addPost(post) {
      firestore.collection('posts')
        .add(post)
        .then(() => {
          ...
        })
    }

  ```

  + **Update** 
  ```js
    function updatePost(postId) {
      firestore.collection('posts')
        .doc(postId)
        .set({
          text: postField.value
        })
        .then( ... )
    }
  ```

  + **Delete**
  ```js
    function deletePost(postId) {
      firestore.collection('posts')
        .doc(id)
        .delete()
        .then( ... )
    }
  ```
