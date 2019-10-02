let currentUID = "";
const signOutButton = document.getElementById('logout');

initRouter = function () {
  this.router = new Navigo();

  var that = this;
  this.router
    .on({
      '/': function () {
        loadTests();
      }
    })
    .on({
      '/tests/*': function () {
        var path = that.getCleanPath(document.location.pathname);
        var id = path.split('/')[2];
        that.viewRestaurant(id);
      }
    })
    .resolve();
};

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
    initRouter();
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
      stockList += '<a href="#" class="clickable" id=' + doc.id + '><li class="test">' + doc.data().name + '</li></a>';
    });
    document.getElementById('tests').innerHTML = stockList;
    let tests = document.getElementById("tests").children;
    for (let i = 0; i < tests.length; i++) {
      tests[i].addEventListener('click', function () {
        console.log(tests[i].id);
      });
    }
  });
}
