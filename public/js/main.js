let currentUID = "";
const signOutButton = document.getElementById('logout');
let that;

initRouter = function () {
  this.router = new Navigo();

  that = this;
  this.router
    .on({
      '/': function () {
        loadTests();
      }
    })
    .on({
      '/tests/*': function () {
        let path = document.location.pathname;
        console.log(path);
        let id = path.split('/')[2];
        loadQuestions(id);
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
    document.getElementById('tests').className = 'tests';
    let tests = document.getElementById("tests").children;
    for (let i = 0; i < tests.length; i++) {
      tests[i].addEventListener('click', function () {
        that.router.navigate('/tests/' + tests[i].id);
      });
    }
  });
}

function loadQuestions(id) {
  let stockList = '';
  firebase.firestore().collection("tests").doc(id).collection("questions").limit(300).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      stockList += '<a  class="clickable" id=' + doc.id + '><li class="question">' + doc.data().question + '<br>' + doc.data().answer + '</li></a>';
    });
    document.getElementById('tests').innerHTML = stockList;
    document.getElementById('tests').className = 'questions';
    let tests = document.getElementById("tests").children;
    for (let i = 0; i < tests.length; i++) {
      tests[i].addEventListener('click', function () {
        that.router.navigate('/tests/' + tests[i].id);
      });
    }
  });
}
