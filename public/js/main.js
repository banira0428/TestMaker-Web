let currentUser;
const signOutButton = document.getElementById('logout');
const saveQuestionButton = document.getElementById('save-question');
const saveTestButton = document.getElementById('save-test');
const textTestTitle = document.getElementById('text-test-title');
const imageQuestion = document.getElementById('image-question');
const fileUploadForm = document.getElementById('files');
const messageImage = document.getElementById('message-image');
const mainContent = document.getElementById('content');
const loginContent = document.getElementById('content-login');

let that;
let testId = '';
let size = 0;
let selectedQuestion = null;

window.addEventListener('load', function () {

  signOutButton.addEventListener('click', function () {
    firebase.auth().signOut();
  });

  saveTestButton.addEventListener('click', function () {
    saveTest();
  });

  saveQuestionButton.addEventListener('click', function () {
    if (!validate()) {
      window.alert("入力されていないフォームがあります");
      return;
    }

    if (size > 300) {
      window.alert("一つの問題集につき問題数は300問までにしてください");
      return;
    }

    let forms = document.getElementsByName("tab_item");
    let builder = new QuestionBuilder();

    let data = builder
      .setQuestion(formQuestionQuestionList[0].value)
      .setExplanation(formExplanation.value)
      .setImageRef(EditorHelper.getImageRef());

    forms.forEach((it, index) => {
      if (it.checked) {
        data = data.setType(index);
        switch (parseInt(it.value)) {
          case Types.WRITE:
            data = data
              .setAnswer(formQuestionAnswerList[0].value);
            break;
          case Types.SELECT:
            data = data
              .setAnswer(formQuestionAnswerList[0].value)
              .setOthers(formQuestionOtherList.filter(it => !it.classList.contains('none')).map(it => it.value))
              .setAuto(checkAuto.firstElementChild.checked);
            break;
          case Types.COMPLETE:
            data = data
              .setAnswers(formQuestionAnswerList.filter(it => !it.classList.contains('none')).map(it => it.value))
              .setCheckOrder(checkCheckOrder.firstElementChild.checked);
            break;
          case  Types.SELECT_COMPLETE:
            data = data
              .setAnswers(formQuestionAnswerList.filter(it => !it.classList.contains('none')).map(it => it.value))
              .setOthers(formQuestionOtherList.filter(it => !it.classList.contains('none')).map(it => it.value))
              .setAuto(checkAuto.firstElementChild.checked);
            break;
        }
      }
    });

    clearFormQuestion();
    formQuestionQuestionList[0].focus();

    if (selectedQuestion !== null) {
      data = data.setOrder(selectedQuestion.data().order);
      saveQuestion(data.build());
    } else {
      data = data.setOrder(size);
      addQuestion(data.build());
    }
  });

  $('input[name="tab_item"]:radio').change(function () {
    EditorHelper.setType(parseInt($(this).val()));
  });

  selectOtherSize.addEventListener('change', function () {
    formQuestionOtherList.forEach((it, index) => {
      if (index > (parseInt(selectOtherSize.value))) {
        it.classList.add("none");
      } else {
        it.classList.remove("none")
      }
    });
  });

  selectCompleteAnswerSize.addEventListener('change', function () {
    formQuestionAnswerList.forEach((it, index) => {
      if (index > (parseInt(selectCompleteAnswerSize.value))) {
        it.classList.add("none");
      } else {
        it.classList.remove("none")
      }
    });
  });

  selectSelectCompleteAnswerSize.addEventListener('change', function () {
    reloadSelectCompleteForm();
  });

  selectAnswerAndOtherSize.addEventListener('change', function () {
    reloadSelectCompleteForm();
  });

  checkAuto.addEventListener('change', function () {
    EditorHelper.setAuto(checkAuto.firstElementChild.checked);
  });

  fileUploadForm.addEventListener('change', function (e) {
    loadImageFile(e);
  });

  cancelEditButton.addEventListener('click', function () {
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
    loginContent.classList.add("none");
    mainContent.classList.remove("none");
    signOutButton.classList.remove("none");

    loadTests();
  } else {
    // Set currentUID to null.
    currentUser = null;
    loginContent.classList.remove("none");
    mainContent.classList.add("none");
    signOutButton.classList.add("none");

    // Display the splash page where you can sign-in.
  }
}

function login(){
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

function loadTests() {

  document.getElementById('tests').innerHTML = '<p class="loading">読み込み中です</p>';

  let stockList = '';
  $("#form-test").removeClass("none");
  $("#form-question").addClass("none");
  firebase.firestore().collection("tests").limit(50).where('userId', '==', currentUser.uid).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      stockList +=
        '<div class="card-test">' +
        '<a href="#" class="clickable" id=' + doc.id + '>' +
        '<div class="test">' + doc.data().name + '</div>' +
        '</a>' +
        '<button class="delete-test btn-rect-border" type="button">削除</button>' +
        '</div>\n';
    });
    document.getElementById('tests').innerHTML = stockList;
    document.getElementById('tests').className = 'tests';
    let tests = document.getElementById("tests").getElementsByClassName("clickable");

    if (stockList === '') {
      document.getElementById('tests').innerHTML = '<p class="loading">登録している問題集はありません</p>';
    }

    let deleteButtons = Array.from(document.getElementById("tests").getElementsByClassName("delete-test"));
    deleteButtons.forEach((it, index) => {
      it.addEventListener('click', function () {
        if (window.confirm('問題集 ' + querySnapshot.docs[index].data().name + 'を削除しますか？')) {
          deleteTest(querySnapshot.docs[index].id);
        }
      });
    });

    for (let i = 0; i < tests.length; i++) {
      tests[i].addEventListener('click', function () {
        testId = tests[i].id;
        loadQuestions();
      });
    }
  });
}

function loadQuestions() {

  document.getElementById('tests').innerHTML = '<p class="loading">読み込み中です</p>';

  let stockList = '';
  $("#form-test").addClass("none");
  $("#form-question").removeClass("none");
  firebase.firestore().collection("tests").doc(testId).collection("questions").limit(300).orderBy("order").get().then((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      stockList +=
        '<div class="card-question">' +
        '<a href="#" class="clickable" id=' + doc.id + '>' +
        '<div class="question"><p class="single">' + doc.data().question + '</p><p class="single">' + doc.data().answer + '</p></div>' +
        '</a>' +
        '<button class="delete-question btn-rect-border" type="button">削除</button>' +
        '</div>\n';
    });

    if (stockList === '') {
      document.getElementById('tests').innerHTML = '<p class="loading">登録している問題はありません</p>';
    } else {
      document.getElementById('tests').innerHTML = stockList;
    }

    document.getElementById('tests').className = 'questions';
    let questions = document.getElementById("tests").getElementsByClassName("clickable");
    size = questions.length;

    let deleteButtons = Array.from(document.getElementById("tests").getElementsByClassName("delete-question"));
    deleteButtons.forEach((it, index) => {
      it.addEventListener('click', function () {
        if (window.confirm('問題 ' + querySnapshot.docs[index].data().question + 'を削除しますか？')) {
          deleteQuestion(querySnapshot.docs[index].id);
        }
      });
    });

    for (let i = 0; i < questions.length; i++) {
      questions[i].addEventListener('click', function () {
        saveQuestionButton.textContent = "上書きして保存";
        window.scrollTo(0, 0);

        selectedQuestion = querySnapshot.docs[i];
        let data = querySnapshot.docs[i].data();

        EditorHelper
          .setIsVisibleCancelEditButton(true)
          .setQuestion(data.question)
          .setExplanation(data.explanation)
          .setType(data.type);

        $('input[name="tab_item"]:radio')[data.type].checked = true;

        switch (data.type) {
          case Types.WRITE:
            EditorHelper
              .setAnswer(data.answer);
            break;
          case Types.SELECT:
            EditorHelper
              .setAnswer(data.answer)
              .setOthers(data.others)
              .setAuto(data.auto);
            break;
          case Types.COMPLETE:
            EditorHelper
              .setAnswers(data.answers)
              .setCheckOrder(data.checkOrder);
            break;
          case Types.SELECT_COMPLETE:
            EditorHelper
              .setAnswers(data.answers)
              .setOthers(data.others)
              .setAuto(data.auto);
            break;
        }
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
    firebase.firestore().collection("tests").doc(testId).update({
      size: size + 1,
    });
    loadQuestions();
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function saveQuestion(data) {
  firebase.firestore().collection("tests").doc(testId).collection("questions").doc(selectedQuestion.id).set(
    data.getObject()
  ).then(function () {
    loadQuestions();
    selectedQuestion = null;

  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function deleteQuestion(id) {
  firebase.firestore().collection("tests").doc(testId).collection("questions").doc(id).delete().then(function () {
    firebase.firestore().collection("tests").doc(testId).update({
      size: size - 1,
    });
    loadQuestions();
    clearFormQuestion();
    selectedQuestion = null;
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function deleteTest(id) {
  firebase.firestore().collection("tests").doc(id).delete().then(function () {
    loadTests();
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
  EditorHelper.clear();
  selectedQuestion = null;
}

function reloadSelectCompleteForm() {
  formQuestionAnswerList.forEach((it, index) => {
    if (index >= (parseInt(selectSelectCompleteAnswerSize.value))) {
      it.classList.add("none");
    } else {
      it.classList.remove("none")
    }
  });
  formQuestionOtherList.forEach((it, index) => {
    if (index > (parseInt(selectAnswerAndOtherSize.value) - parseInt(selectSelectCompleteAnswerSize.value))) {
      it.classList.add("none");
    } else {
      it.classList.remove("none")
    }
  });
}

function validate() {
  if (formQuestionQuestionList.some(it => it.value === "")) {
    return false;
  }
  if (Array.from($("#group-text-question-answers")).some(it => it.value === "" && !it.classList.contains("none"))) {
    return false;
  }
  if (Array.from($("#group-text-question-others")).some(it => it.value === "" && !it.classList.contains("none")) &&
    [Types.SELECT, Types.SELECT_COMPLETE].includes($("#form-question-tab").tab_item.value)) {
    return false;
  }
  return true;
}

function loadImageFile(e) {
  messageImage.textContent = "アップロード中";

  imageQuestion.textContent = e.target.value.split("\\").slice(-1)[0].substr(0, 30);
  let file = e.target.files[0]; // FileList object

  if (file === undefined) {
    imageQuestion.textContent = "画像ファイルを選択";
    EditorHelper.setImageRef("");
    messageImage.textContent = "";
  }

  if (file.size > 1000000) {
    messageImage.textContent = "ファイルサイズは1MB以下にしてください";
  } else {
    let path = currentUser.uid + '/' + new Date().getTime();

    let imageRef = firebase.storage().ref().child(path);
    EditorHelper.setImageRef(path);

    imageRef.put(file, {contentType: 'image/jpeg'}).then(function () {
      messageImage.textContent = "アップロード完了";
    });
  }
}

