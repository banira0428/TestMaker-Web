let currentUID = "";
const signOutButton = document.getElementById('logout');
const saveButton = document.getElementById('save');
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

  saveButton.addEventListener('click', function () {
    if(selectedQuestion !== null){
      saveQuestion();
    }else{
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

function loadQuestions() {
  let stockList = '';
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

function saveQuestion(){
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
    questionId = "";
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function deleteQuestion(){
  firebase.firestore().collection("tests").doc(testId).collection("questions").doc(selectedQuestion.id).delete().then(function () {
    loadQuestions();
    questionId = "";
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });

}
