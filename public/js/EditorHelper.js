const Types = {
  WRITE: 0,
  SELECT: 1,
  COMPLETE: 2,
  SELECT_COMPLETE: 3
};

const cancelEditButton = document.getElementById("cancel-question");
const checkAuto = document.getElementById("check-auto-layout");
const checkCheckOrder = document.getElementById("check-check-order-layout");
const checkExplanation = document.getElementById("check-explanation-layout");
const selectOtherSize = document.getElementById("select-other-size");
const selectCompleteAnswerSize = document.getElementById("select-complete-answer-size");
const selectSelectCompleteAnswerSize = document.getElementById("select-select-complete-answer-size");
const selectAnswerAndOtherSize = document.getElementById("select-answer-other-size");

const formQuestionQuestionList = [
  document.getElementById('text-question-question'),
];

const formQuestionAnswerList = [
  document.getElementById('text-question-answer-1'),
  document.getElementById('text-question-answer-2'),
  document.getElementById('text-question-answer-3'),
  document.getElementById('text-question-answer-4'),
  document.getElementById('text-question-answer-5'),
  document.getElementById('text-question-answer-6'),
];

const formQuestionOtherList = [
  document.getElementById('text-question-other-1'),
  document.getElementById('text-question-other-2'),
  document.getElementById('text-question-other-3'),
  document.getElementById('text-question-other-4'),
  document.getElementById('text-question-other-5'),
];

const formExplanation = document.getElementById('text-question-explanation');

let imageRef = "";

let EditorHelper = {

  setType: function (type) {

    let formAnswerSize = 0;
    let formOtherSize = 0;
    let isShowAuto = false;
    let isShowCheckOrder = false;

    selectOtherSize.parentElement.classList.add("none");
    selectCompleteAnswerSize.parentElement.classList.add("none");
    selectAnswerAndOtherSize.parentElement.classList.add("none");
    selectSelectCompleteAnswerSize.parentElement.classList.add("none");

    switch (type) {
      case Types.WRITE:
        formAnswerSize = 1;
        formOtherSize = 0;
        break;
      case Types.SELECT:
        formAnswerSize = 1;
        formOtherSize = 3;
        isShowAuto = true;
        selectOtherSize.parentElement.classList.remove("none");
        break;
      case Types.COMPLETE:
        formAnswerSize = 4;
        formOtherSize = 0;
        isShowCheckOrder = true;
        selectCompleteAnswerSize.parentElement.classList.remove("none");
        selectCompleteAnswerSize.value = 3;
        break;
      case Types.SELECT_COMPLETE:
        formAnswerSize = 2;
        formOtherSize = 2;
        isShowAuto = true;
        selectSelectCompleteAnswerSize.parentElement.classList.remove("none");
        selectAnswerAndOtherSize.parentElement.classList.remove("none");
        break;
    }

    formQuestionAnswerList.forEach((it, index) => {
      this.setIsVisible(it, index < formAnswerSize);
    });
    formQuestionOtherList.forEach((it, index) => {
      this.setIsVisible(it, index < formOtherSize);
    });
    this.setIsVisible(checkAuto, isShowAuto);
    this.setIsVisible(checkCheckOrder, isShowCheckOrder);

    return this;
  },

  setQuestion: function (question) {
    formQuestionQuestionList[0].value = question;
    return this;
  },

  setAnswer: function (answer) {
    formQuestionAnswerList[0].value = answer;
    return this;
  },

  setAnswers: function (answers) {
    formQuestionAnswerList.forEach((it, index) => {
      if (index < answers.length) {
        it.value = answers[index];
      }
      this.setIsVisible(it, index < answers.length)
    });
    return this;
  },

  setOthers: function (others) {
    formQuestionOtherList.forEach((it, index) => {
      if (index < others.length) {
        it.value = others[index];
      }
      this.setIsVisible(it, index < others.length)
    });
    return this;
  },

  setAuto: function (isAuto) {
    checkAuto.firstElementChild.checked = isAuto;
    formQuestionOtherList.forEach(it => {
      it.disabled = isAuto;
      if (isAuto) {
        it.value = "自動生成";
      } else if (it.value === "自動生成") {
        it.value = "";
      }
    });
    return this;
  },

  setCheckOrder: function (isCheckOrder) {
    checkCheckOrder.firstElementChild.checked = isCheckOrder;
    return this;
  },

  setIsVisibleCancelEditButton: function (isEditing) {
    this.setIsVisible(cancelEditButton, isEditing);
    return this;
  },

  setIsVisibleExplanation: function (isExplanation) {
    checkExplanation.firstElementChild.checked = isExplanation;
    this.setIsVisible(formExplanation, isExplanation);
    return this;
  },

  setExplanation: function (explanation) {
    this.setIsVisibleExplanation(explanation !== "");
    formExplanation.value = explanation;
    return this;
  },

  setIsVisible: function (element, isVisible) {
    if (isVisible) {
      element.classList.remove("none")
    } else {
      element.classList.add("none")
    }
  },

  setImageRef: function (ref) {
    imageRef = ref;
    return this;
  },

  getImageRef: function () {
    return imageRef;
  },

  clear: function () {
    formQuestionQuestionList.forEach(it => it.value = "");
    formQuestionAnswerList.forEach(it => it.value = "");
    formQuestionOtherList.forEach(it => it.value = "");
    formExplanation.value = "";
    this.setImageRef("");
    imageQuestion.textContent = "画像ファイルを選択";
    messageImage.textContent = "";
    cancelEditButton.classList.add("none");
    saveQuestionButton.textContent = "追加して保存";
  }
};
