const Types = {
  WRITE: 0,
  SELECT: 1,
  COMPLETE: 2,
  SELECT_COMPLETE: 3
};


let currentUser;
const signOutButton = document.getElementById('logout');
const saveQuestionButton = document.getElementById('save-question');
const saveTestButton = document.getElementById('save-test');
const textTestTitle = document.getElementById('text-test-title');
const editQuestionForm = document.getElementById('form-question');
const editTestForm = document.getElementById('form-test');
const deleteButton = document.getElementById('delete-question');
const cancelEditQuestionButton = document.getElementById('cancel-question');
const textQuestion = document.getElementById('text-question-question');
const textAnswer = document.getElementById('text-question-answer');


const formQuestionWriteList = [
  document.getElementById('text-question-question'),
  document.getElementById('text-question-answer'),
];

const formQuestionSelectList = [
  document.getElementById('text-question-question-select'),
  document.getElementById('text-question-answer-select'),
  document.getElementById('text-question-other-select-1'),
  document.getElementById('text-question-other-select-2'),
  document.getElementById('text-question-other-select-3'),
  document.getElementById('text-question-other-select-4'),
  document.getElementById('text-question-other-select-5')
];
const selectSelectSelectSize = document.getElementById('select-select-size');

const formQuestionCompleteList = [
  document.getElementById('text-question-question-complete'),
  document.getElementById('text-question-answer-complete-1'),
  document.getElementById('text-question-answer-complete-2'),
  document.getElementById('text-question-answer-complete-3'),
  document.getElementById('text-question-answer-complete-4')
];
const selectCompleteAnswerSize = document.getElementById('complete-answer-size');


const formQuestionSelectCompleteList = [
  document.getElementById('text-question-question-select-complete'),
  document.getElementById('text-question-answer-select-complete-1'),
  document.getElementById('text-question-answer-select-complete-2'),
  document.getElementById('text-question-answer-select-complete-3'),
  document.getElementById('text-question-answer-select-complete-4'),
  document.getElementById('text-question-answer-select-complete-5'),
  document.getElementById('text-question-answer-select-complete-6'),
  document.getElementById('text-question-other-select-complete-1'),
  document.getElementById('text-question-other-select-complete-2'),
  document.getElementById('text-question-other-select-complete-3'),
  document.getElementById('text-question-other-select-complete-4'),
  document.getElementById('text-question-other-select-complete-5'),
  document.getElementById('text-question-other-select-complete-6'),
];
const selectSelectCompleteAnswerSize = document.getElementById('select-complete-answer-size');
const selectSelectCompleteSelectSize = document.getElementById('select-complete-select-size');


let that;
let testId = '';
let size = 0;
let selectedQuestion = null;

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

    let forms = document.getElementById("form-question-tab");

    let data = null;

    let builder = new QuestionBuilder();

    switch (forms.tab_item.value) {
      case "write":
        if (formQuestionWriteList.some(it => it.value === "")) {
          return;
        }
        data = builder
          .setQuestion(formQuestionWriteList[0].value)
          .setAnswer(formQuestionWriteList[1].value)
          .setOrder(size)
          .build();

        break;
      case "select":
        if (formQuestionSelectList.some(it => it.value === "")) {
          return;
        }
        data = builder
          .setQuestion(formQuestionSelectList[0].value)
          .setAnswer(formQuestionSelectList[1].value)
          .setOrder(size)
          .build();

        break;
      case "complete":
        if (formQuestionCompleteList.some(it => it.value === "")) {
          return;
        }
        break;
      case  "select-complete":
        if (formQuestionSelectCompleteList.some(it => it.value === "")) {
          return;
        }
        break;
    }

    if (selectedQuestion !== null) {
      saveQuestion(data);
    } else {
      addQuestion(data);
    }
  });

  selectSelectSelectSize.addEventListener('change',function() {
    formQuestionSelectList.forEach((value, index) => {
      if (selectSelectSelectSize.value < index) {
        formQuestionSelectList[index].style.display = "none";
      }else{
        formQuestionSelectList[index].style.display = "block";
      }
    });
  });

  selectCompleteAnswerSize.addEventListener('change',function() {
    formQuestionCompleteList.forEach((value, index) => {
      if (selectCompleteAnswerSize.value < index) {
        formQuestionCompleteList[index].style.display = "none";
      }else{
        formQuestionCompleteList[index].style.display = "block";
      }
    });
  });

  selectSelectCompleteAnswerSize.addEventListener('change',function() {
    reloadSelectCompleteForm()
  });

  selectSelectCompleteSelectSize.addEventListener('change',function() {
    reloadSelectCompleteForm()
  });

  deleteButton.addEventListener('click', function () {
    deleteQuestion();
  });

  cancelEditQuestionButton.addEventListener('click', function () {
    clearFormQuestion();
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

  document.getElementById('tests').innerHTML = '<p class="loading">読み込み中です</p>';

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

    if (stockList === '') {
      document.getElementById('tests').innerHTML = '<p class="loading">登録している問題集はありません</p>';
    }

    for (let i = 0; i < tests.length; i++) {
      tests[i].addEventListener('click', function () {
        that.router.navigate('/tests/' + tests[i].id);
      });
    }
  });
}

function loadQuestions() {

  document.getElementById('tests').innerHTML = '<p class="loading">読み込み中です</p>';

  let stockList = '';
  editTestForm.style.display = "none";
  editQuestionForm.style.display = "block";
  firebase.firestore().collection("tests").doc(testId).collection("questions").limit(300).orderBy("order").get().then((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      stockList += '<a href="#" class="clickable" id=' + doc.id + '><div class="question">' + doc.data().question + '<br>' + doc.data().answer + '</div></a>';
    });
    document.getElementById('tests').innerHTML = stockList;
    document.getElementById('tests').className = 'questions';
    let questions = document.getElementById("tests").children;
    size = questions.length;

    if (stockList === '') {
      document.getElementById('tests').innerHTML = '<p class="loading">登録している問題はありません</p>';
    }

    for (let i = 0; i < questions.length; i++) {
      questions[i].addEventListener('click', function () {
        window.scrollTo(0, 0);
        selectedQuestion = querySnapshot.docs[i];
        textQuestion.value = querySnapshot.docs[i].data().question;
        textAnswer.value = querySnapshot.docs[i].data().answer;
      });
    }
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function addQuestion(data) {
  firebase.firestore().collection("tests").doc(testId).collection("questions").add(
    data.getObject()
  ).then(function () {
    loadQuestions();
    clearFormQuestion();
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function saveQuestion(data) {
  firebase.firestore().collection("tests").doc(testId).collection("questions").doc(selectedQuestion.id).set(
    data.getObject()
  ).then(function () {
    loadQuestions();
    clearFormQuestion();
    selectedQuestion = null;
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function deleteQuestion() {
  firebase.firestore().collection("tests").doc(testId).collection("questions").doc(selectedQuestion.id).delete().then(function () {
    loadQuestions();
    clearFormQuestion();
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

function clearFormQuestion() {
  textQuestion.value = "";
  textAnswer.value = "";
  selectedQuestion = null;
}
function reloadSelectCompleteForm() {
  formQuestionSelectCompleteList.forEach((value, index) => {
    if(index > 6){
      return;
    }
    if (selectSelectCompleteAnswerSize.value < index) {
      formQuestionSelectCompleteList[index].style.display = "none";
    }else{
      formQuestionSelectCompleteList[index].style.display = "block";
    }
  });
  formQuestionSelectCompleteList.forEach((value, index) => {
    if(index <= 6){
      return;
    }
    if (selectSelectCompleteSelectSize.value - selectSelectCompleteAnswerSize.value < (index - 6)) {
      formQuestionSelectCompleteList[index].style.display = "none";
    }else{
      formQuestionSelectCompleteList[index].style.display = "block";
    }
  });
}

