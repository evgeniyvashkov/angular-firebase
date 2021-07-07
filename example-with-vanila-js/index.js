const firebaseConfig = {
  apiKey: "AIzaSyBWU-epHDG3P4-2pwUW6Z3suiTLBNHcKlQ",
  authDomain: "my-project-abd93.firebaseapp.com",
  projectId: "my-project-abd93",
  storageBucket: "my-project-abd93.appspot.com",
  messagingSenderId: "458568985532",
  appId: "1:458568985532:web:e5025c244cfbf465b359b9"
};

firebase.initializeApp(firebaseConfig);

const ACTIONS_TYPE = {
  EDIT: 1,
  DELETE: 2
}

const provider = new firebase.auth.GoogleAuthProvider();
const app = document.getElementById('app');
const firestore = firebase.firestore();
const postsRef = firestore.collection('posts');
let signInBtn;
let signOutBtn;
let posts = [];
let editablePost;
let addBtn;
let postField;
let postsList;
let logged = false;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    initApp(user);
  } else {
    app.innerHTML = '<button id="sign-in">Sign In</button>';
    signInBtn = document.getElementById('sign-in');
    signInBtn.addEventListener('click', signIn);
  }
})

function getPosts() {
  postsRef.get().then(response => {
    posts = response.docs.map(post => ({ id: post.id, ...post.data() }));
    console.log(posts);
    let postsLayout = '';

    posts.forEach(post => {
      postsLayout += `
              <li data-post-id="${post.id}">
                <span>${post.text}</span>
                <button data-action-type="${ACTIONS_TYPE.EDIT}">Edit</button>
                <button data-action-type="${ACTIONS_TYPE.DELETE}">Delete</button>
              </li>`
    })

    postsList.innerHTML = postsLayout;
  })
}

function addPost() {
  if (!postField.value) {
    return;
  }

  const post = { text: postField.value };

  postsRef.add(post).then(() => {
    console.log('post added');
    getPosts();
    postField.value = '';
  })
}

function deletePost(id) {
  postsRef.doc(id).delete()
    .then(() => {
      alert('Post deleted');
      getPosts();
    })
    .catch(() => console.log('Oops...'))
}

function editPost(post) {
  addBtn.removeEventListener('click', addPost);
  postField.value = post.text;
  addBtn.innerText = 'Update';
  editablePost = post;
  addBtn.addEventListener('click', updatePost);
}

function updatePost() {
  postsRef.doc(editablePost.id).set({
    text: postField.value
  })
    .then(() => {
      setAddMode();
      getPosts();
    })
    .catch(() => console.log('Oops...'))

}

function signIn() {
  firebase.auth().signInWithPopup(provider)
    .then(res => {
      console.log(`You have been signed on as ${res.user.displayName}`)
      initApp();
    }).catch(err => {
      console.log('Oops ...')
    });
}

function signOut() {
  firebase.auth().signOut().then(() => {
    console.log('You have been signed out');
    app.innerHTML = '<button id="sign-out">Sign Out</button>';
  })
}

function setAddMode() {
  addBtn.removeEventListener('click', updatePost);
  addBtn.innerText = 'Add';
  postField.value = '';
  editablePost = null;
  addBtn.addEventListener('click', addPost);
}

function setEditMode(post) {
  addBtn.removeEventListener('click', addPost);
  postField.value = post.text;
  addBtn.innerText = 'Update';
  editablePost = post;
  addBtn.addEventListener('click', updatePost);
}

function initApp(user) {
  app.innerHTML = `
      <h2>${user ? user.displayName : null}</h2>
      <button id="sign-out">Sign Out</button>

      <div>
        <textarea id="post-field"></textarea>
        <button id="add">Add</button>
      </div>

      <ul id="posts-list"></ul>
  `
  addBtn = document.getElementById('add');
  postField = document.getElementById('post-field');
  postsList = document.getElementById('posts-list');
  signOutBtn = document.getElementById('sign-out');
  signOutBtn.addEventListener('click', signOut);

  addBtn.addEventListener('click', addPost);

  postsList.addEventListener('click', ({ target }) => {
    const actionType = Number(target.dataset.actionType);
    const postId = target.parentElement.dataset.postId;

    if (actionType === ACTIONS_TYPE.EDIT) {
      const post = posts.find(post => post.id === postId);
      editPost(post);
    }

    if (actionType === ACTIONS_TYPE.DELETE) {
      deletePost(postId);
    }
  })

  getPosts();
}
