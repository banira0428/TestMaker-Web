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
  },
  getObject: function(){
    return {
      question: this.question,
      answer: this.answer,
      explanation: this.explanation,
      imageRef: this.imageRef,
      auto: this.auto,
      checkOrder: this.checkOrder,
      others: this.others,
      answers: this.answers,
      type: this.type,
      order: this.order
    };
  }
};

let QuestionBuilder = function () {
  this.question = new Question("", "", "", "", false, false, [], [], 0, 0);
};

QuestionBuilder.prototype = {
  setQuestion(question){
    this.question.question = question;
    return this;
  },
  setAnswer(answer){
    this.question.answer = answer;
    return this;
  },
  setExplanation(explanation){
    this.question.explanation = explanation;
    return this;
  },
  setImageRef(imageRef){
    this.question.imageRef = imageRef;
    return this;
  },
  setAuto(auto){
    this.question.auto = auto;
    return this;
  },
  setCheckOrder(checkOrder){
    this.question.checkOrder = checkOrder;
    return this;
  },
  setOthers(others){
    this.question.others = others;
    return this;
  },
  setAnswers(answers){
    this.question.answers = answers;
    this.question.answer = answers.join(' ');
    return this;
  },
  setType(type){
    this.question.type = type;
    return this;
  },
  setOrder(order){
    this.question.order = order;
    return this;
  },
  build(){
    return this.question;
  }
};



