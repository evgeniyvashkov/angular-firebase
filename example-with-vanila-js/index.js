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


const addBtn = document.getElementById('add');
const postField = document.getElementById('post-field');
const postsList = document.getElementById('posts-list');
const signInBtn = document.getElementById('sign-in');
const signOutBtn = document.getElementById('sign-out');
const provider = new firebase.auth.GoogleAuthProvider();

const firestore = firebase.firestore();
const postsRef = firestore.collection('posts');

function getPosts() {
  postsRef.get().then(response => {
      const posts = response.docs.map(_post => _post.data());
      console.log(posts);
      let postsLayout = '';

      posts.forEach(post => {
          postsLayout += `
              <li>${post.text}</li>
              <button id="edit">Edit</button>
              <button id="delete">Delete</button>`

      })

      postsList.innerHTML = postsLayout;
  })
}

function addPost() {
  const post = { text: postField.value };

  postsRef.add(post).then(() => {
      console.log('post added');
      getPosts();
      postField.value = '';
  })
}

addBtn.addEventListener('click', addPost);

signInBtn.addEventListener('click', signIn)
signOutBtn.addEventListener('click', signOut);

function signIn() {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
      .then(() => {
          return firebase.auth().signInWithPopup(provider)
      })
      .then(res => {
          console.log(`You have been signed on as ${res.user.displayName}`)
      }).catch(err => {
      console.log('Oops ...')
  });
}

function signOut() {
  firebase.auth().signOut().then(() => console.log('You have been signed out'))
}

getPosts();

