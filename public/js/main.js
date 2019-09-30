let currentUID = "";
const signOutButton = document.getElementById('logout');

window.addEventListener('load', function () {
  // Bind Sign in button.
  // if(currentUID === ""){
  //   let provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider);
  // }

  signOutButton.addEventListener('click', function () {
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
    loadTests();
  } else {
    // Set currentUID to null.
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    currentUID = null;
    // Display the splash page where you can sign-in.
  }
}

function loadTests() {
  let stockList = '';
  firebase.firestore().collection("tests").limit(50).where('userId', '==', currentUID).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.data().name} => ${doc.id}`);
      stockList += '<li class="test">' + doc.data().name + '</li>';　// = ではなく += を使う
    });
    document.getElementById('tests').innerHTML = stockList;
  });
}
