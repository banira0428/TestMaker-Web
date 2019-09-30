
let stockList = '';
for (var i=0; i<4;i++){
  stockList += '<li class="test">'+ i + '番目の問題集です。</li>';　// = ではなく += を使う
}

document.getElementById('tests').innerHTML = stockList;

let currentUID = "";

window.addEventListener('load', function () {
  // Bind Sign in button.
  if(currentUID === ""){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  signOutButton.addEventListener('click', function() {
    firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged(onAuthStateChanged);

}, false);

function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }

  if (user) {
    currentUID = user.uid;
    splashPage.style.display = 'none';

    that.initTemplates();
    that.initRouter();
  } else {
    // Set currentUID to null.
    currentUID = null;
    splashPage.style.display = null;

    // Display the splash page where you can sign-in.
  }
}
