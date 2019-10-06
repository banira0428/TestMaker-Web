let currentUser;
const signOutButton = document.getElementById('logout');
const saveQuestionButton = document.getElementById('save-question');
const saveTestButton = document.getElementById('save-test');
const textTestTitle = document.getElementById('text-test-title');
const editQuestionForm = document.getElementById('form-question');
const editTestForm = document.getElementById('form-test');
const deleteButton = document.getElementById('delete-question');
const textQuestion = document.getElementById('text-question');
const textAnswer = document.getElementById('text-answer');

let that;
let testId = '';
let size = 0;
let selectedQuestion;

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
        testId = path.split('/')[2];
        loadQuestions();
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

  saveTestButton.addEventListener('click', function () {
    saveTest();
  });

  saveQuestionButton.addEventListener('click', function () {
    if (selectedQuestion !== null) {
      saveQuestion();
    } else {
      addQuestion();
    }
  });

  deleteButton.addEventListener('click', function () {
    deleteQuestion();
  });

  firebase.auth().onAuthStateChanged(onAuthStateChanged);

}, false);

function onAuthStateChanged(user) {
  // We ignore token refresh events.

  if (user && currentUser && currentUser.uid === user.uid) {
    return;
  }

  if (user) {
    currentUser = user;
    initRouter();
    loadTests();
  } else {
    // Set currentUID to null.
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    currentUser = null;
    // Display the splash page where you can sign-in.
  }
}

function loadTests() {
  let stockList = '';
  editTestForm.style.display = "block";
  editQuestionForm.style.display = "none";
  firebase.firestore().collection("tests").limit(50).where('userId', '==', currentUser.uid).get().then((querySnapshot) => {
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

function loadQuestions() {
  let stockList = '';
  editTestForm.style.display = "none";
  editQuestionForm.style.display = "block";
  firebase.firestore().collection("tests").doc(testId).collection("questions").limit(300).orderBy("order").get().then((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      stockList += '<a  class="clickable" id=' + doc.id + '><div class="question">' + doc.data().question + '<br>' + doc.data().answer + '</div></a>';
      console.log(doc.data().order);
    });
    document.getElementById('tests').innerHTML = stockList;
    document.getElementById('tests').className = 'questions';
    let tests = document.getElementById("tests").children;
    size = tests.length;
    for (let i = 0; i < tests.length; i++) {
      tests[i].addEventListener('click', function () {
        window.scrollTo(0, 0);
        selectedQuestion = querySnapshot.docs[i];
        textQuestion.value = querySnapshot.docs[i].data().question;
        textAnswer.value = querySnapshot.docs[i].data().answer;
      });
    }
  });
}

function addQuestion() {
  firebase.firestore().collection("tests").doc(testId).collection("questions").add(
    {
      question: textQuestion.value,
      answer: textAnswer.value,
      explanation: "",
      imageRef: "",
      auto: false,
      checkOrder: false,
      others: [],
      answers: [],
      type: 0,
      order: size
    }
  ).then(function () {
    loadQuestions()
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function saveQuestion() {
  firebase.firestore().collection("tests").doc(testId).collection("questions").doc(selectedQuestion.id).set(
    {
      question: textQuestion.value,
      answer: textAnswer.value,
      explanation: selectedQuestion.data().explanation,
      imageRef: selectedQuestion.data().imageRef,
      auto: selectedQuestion.data().auto,
      checkOrder: selectedQuestion.data().checkOrder,
      others: selectedQuestion.data().others,
      answers: selectedQuestion.data().answers,
      type: selectedQuestion.data().type,
      order: selectedQuestion.data().order
    }
  ).then(function () {
    loadQuestions();
    selectedQuestion = null;
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function deleteQuestion() {
  firebase.firestore().collection("tests").doc(testId).collection("questions").doc(selectedQuestion.id).delete().then(function () {
    loadQuestions();
    selectedQuestion = null;
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function saveTest() {
  firebase.firestore().collection("tests").add(
    {
      name: textTestTitle.value,
      color: 0,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      locale: document.documentElement.lang,
      overview: "",
      size: 0,
      userId: currentUser.uid,
      userName: currentUser.displayName
    }
  ).then(function () {
    loadTests();
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

