let Question = function (question, answer, explanation, imageRef, auto, checkOrder, others, answers, type, order) {
  this.question = question;
  this.answer = answer;
  this.explanation = explanation;
  this.imageRef = imageRef;
  this.auto = auto;
  this.checkOrder = checkOrder;
  this.others = others;
  this.answers = answers;
  this.type = type;
  this.order = order;
};

Question.prototype = {
  getQuestion: function () {
    return this.question;
  },
  getAnswer: function () {
    return this.answer;
  },
  getExplanation: function () {
    return this.explanation;
  },
  getImageRef: function () {
    return this.imageRef;
  },
  getAuto: function () {
    return this.auto;
  },
  getCheckOrder: function () {
    return this.checkOrder;
  },
  getOthers: function () {
    return this.others;
  },
  getAnswers: function () {
    return this.answers;
  },
  getType: function () {
    return this.type;
  },
  getOrder: function () {
    return this.order;
  }
};

let QuestionBuilder = function () {
  this.question = new Question("", "", "", "", false, false, [], [], 0, 0);
};

QuestionBuilder.prototype = {
  setQuestion(question){
    this.question.question = question;
  },
  setAnswer(answer){
    this.question.answer = answer;
  },
  setExplanation(explanation){
    this.question.explanation = explanation;
  },
  setImageRef(imageRef){
    this.question.imageRef = imageRef;
  },
  setAuto(auto){
    this.question.auto = auto;
  },
  setCheckOrder(checkOrder){
    this.question.checkOrder = checkOrder;
  },
  setOthers(others){
    this.question.others = others;
  },
  setAnswers(answers){
    this.question.answers = answers;
  },
  setType(type){
    this.question.type = type;
  },
  setOrder(){
    this.question.order = order;
  }
};



