<template>
  <div>
    <div class="border-bottom pb-1">
      <h1 class="h2 d-inline">「{{testName}}」の問題一覧</h1>
      <b-spinner class="ml-2" variant="primary" label="Spinning" v-if="loading"/>
    </div>

    <b-card-group class="mt-3">
      <b-col md="8">
        <b-card no-body class="mt-1">
          <b-card-header header-tag="nav">
            <b-card-title>
              問題の編集
            </b-card-title>
            <b-nav card-header tabs fill>
              <b-nav-item v-bind:active="type === Types.WRITE" v-on:click="type = Types.WRITE">記述</b-nav-item>
              <b-nav-item v-bind:active="type === Types.SELECT" v-on:click="type = Types.SELECT">選択</b-nav-item>
              <b-nav-item v-bind:active="type === Types.COMPLETE" v-on:click="type = Types.COMPLETE">完答</b-nav-item>
              <b-nav-item v-bind:active="type === Types.SELECT_COMPLETE" v-on:click="type = Types.SELECT_COMPLETE">
                選択完答
              </b-nav-item>
            </b-nav>
          </b-card-header>

          <b-card-body>
            <b-form-group
              id="input-group-1"
              label="問題文"
              label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="textQuestion"
                type="text"
                required
                placeholder="問題文"/>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="解答"
              label-for="input-2">
              <div id="group-text-question-answers" class="mb-2" v-for="(textAnswer,index) in textAnswers"
                   v-bind:key="index">
                <div class="area correct"
                     v-if="index < getAnswerSize()">
                  <b-form-textarea
                    rows="1"
                    max-rows="1"
                    wrap="soft"
                    id="input-2"
                    v-model="textAnswer.text"
                    type="text"
                    required
                    v-bind:placeholder="'解答' + (index+1)"/>
                </div>
              </div>
            </b-form-group>


            <div v-if="type === Types.SELECT || type === Types.SELECT_COMPLETE">

              <b-form-group
                id="input-group-3"
                label="他の選択肢"
                label-for="input-3">
                <div class="mb-2"
                     v-for="(textOther,index) in textOthers"
                     v-bind:key="index">
                  <div class="area other"
                       v-if="index < getOtherSize()">
                    <b-form-textarea
                      rows="1"
                      max-rows="1"
                      wrap="soft"
                      id="input-3"
                      v-model="textOther.text" v-bind:disabled="isAuto"
                      type="text"
                      required
                      v-bind:placeholder="(isAuto) ? '自動生成' : '他の選択肢'"/>
                  </div>
                </div>
              </b-form-group>
            </div>

            <b-form-group
              id="input-group-5"
              label="解説"
              v-if="isExplanation"
              label-for="input-3">
              <b-form-textarea
                rows="1"
                max-rows="0"
                wrap="soft"
                id="input-3"
                v-model="textExplanation"
                type="text"
                required
                placeholder="解説"/>
            </b-form-group>

            <b-form-group
              label="添付画像"
              v-if="isUseImage"
              label-for="form-image">
              <div class="d-flex">
                <b-form-file
                  id="form-image"
                  v-model="fileImageQuestion"
                  placeholder="画像ファイルを選択"
                  drop-placeholder="画像ファイルをここにドロップ"
                ></b-form-file>
                <img v-show="imageUrl !== ''" :src="imageUrl" alt class="image">
              </div>
            </b-form-group>

            <b-button class="btn-lg" block variant="outline-primary" @click="createQuestion()"
                      v-bind:disabled="!validate()">
              {{(questionId !== "") ? '上書き保存' :
              '追加して保存' }}
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col md="4">
        <b-card no-body class="mt-1">
          <b-card-header header-tag="nav">
            <b-card-title>詳細設定</b-card-title>
          </b-card-header>
          <b-card-body>
            <b-form-checkbox class="mb-2" switch v-model="isExplanation">
              解説文を入れる
            </b-form-checkbox>
            <b-form-checkbox class="mb-2" switch v-model="isUseImage">
              画像を添付する
            </b-form-checkbox>
            <b-form-checkbox class="mb-2" switch v-model="isCheckOrder" v-if="type === Types.COMPLETE">
              解答順序を判定に含める
            </b-form-checkbox>
            <b-form-checkbox class="mb-2" switch v-model="isAuto"
                             v-if="type === Types.SELECT || type === Types.SELECT_COMPLETE">
              選択肢の自動生成
            </b-form-checkbox>

            <div class="mt-3">

              <b-form-group
                class="mt-2"
                id="input-radio-1"
                label="選択肢の数"
                label-for="radio-slots-1"
                v-if="type === Types.SELECT">
                <b-form-radio-group
                  id="radio-slots-1"
                  v-model="otherSize"
                  name="radio-options-slots">
                  <b-form-radio v-for="(n) in 5" v-bind:key="n+1" v-bind:value="n">
                    {{n+1}}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>

              <b-form-group
                class="mt-2"
                id="input-radio-2"
                label="解答の数"
                label-for="radio-slots-2"
                v-show="type === Types.COMPLETE">
                <b-form-radio-group
                  id="radio-slots-2"
                  v-model="answerSize"
                  name="radio-options-slots-complete-answer">
                  <b-form-radio v-for="(n) in 3" v-bind:key="n+1" v-bind:value="n+1">
                    {{n+1}}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>

              <b-form-group
                class="mt-2"
                id="input-radio-3"
                label="解答の数"
                label-for="radio-slots-3"
                v-show="type === Types.SELECT_COMPLETE">
                <b-form-radio-group
                  id="radio-slots-3"
                  v-model="answerSizeSelectComplete"
                  name="radio-options-slots-select-complete-answer">
                  <b-form-radio v-for="(n) in 7" v-bind:key="n-1" v-bind:value="n-1">
                    {{n-1}}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>

              <b-form-group
                class="mt-2"
                id="input-radio-4"
                label="選択肢の数"
                label-for="radio-slots-4"
                v-show="type === Types.SELECT_COMPLETE">
                <b-form-radio-group
                  id="radio-slots-4"
                  v-model="otherSizeSelectComplete"
                  name="radio-options-slots-select-complete-other">
                  <b-form-radio v-for="(n) in 5" v-bind:key="n+1" v-bind:value="n+1">
                    {{n+1}}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>

              <b-button block variant="outline-danger" @click="clearForm()"
                        v-show='questionId !== ""'>
                編集内容の破棄
              </b-button>

            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-card-group>

    <div id="ad">
      <a href="https://px.a8.net/svt/ejp?a8mat=35Q274+AEHOAA+3CWI+NV1XD" rel="nofollow">
        <img border="0" width="320" height="50" alt=""
             src="https://www25.a8.net/svt/bgt?aid=191012512629&wid=001&eno=01&mid=s00000015669004008000&mc=1"></a>
      <img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=35Q274+AEHOAA+3CWI+NV1XD"
           alt="">
    </div>

    <b-card-group class="mt-3">
      <div class="col-md-4 mt-3" v-for="q in questions" v-bind:key="q.id">
        <b-card>
          <b-card-text class="single">{{q.question}}</b-card-text>
          <b-card-text class="single">{{q.answer}}</b-card-text>
          <b-row>
            <b-col md="7">
              <b-button class="mt-1" block variant="outline-primary" v-on:click="editQuestion(q)">編集</b-button>
            </b-col>
            <b-col md="5">
              <b-button class="mt-1" block variant="outline-danger" v-on:click="deleteQuestion(q)">削除</b-button>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
    import firebase from 'firebase';
    import store from "../store";

    export default {
        name: "Questions",
        data: function () {

            return {
                Types: {
                    WRITE: 0,
                    SELECT: 1,
                    COMPLETE: 2,
                    SELECT_COMPLETE: 3
                },
                questions: [],
                questionId: "",
                loading: true,
                imageUploading: false,
                testName: "",
                testId: "",
                textQuestion: "",
                textAnswers: [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}],
                textOthers: [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}],
                textExplanation: "",
                fileImageQuestion: null,
                imageRef: "",
                imageUrl: "",
                type: 0,
                order: 0,
                isExplanation: false,
                isUseImage: false,
                isCheckOrder: false,
                isAuto: false,
                answerSize: 4,
                otherSize: 3,
                answerSizeSelectComplete: 2,
                otherSizeSelectComplete: 4,
            }
        },
        mounted: function () {
            this.testName = store.state.test.name;
            this.testId = store.state.test.id;
            this.fetchQuestions();
        },
        watch: {
            fileImageQuestion: function (newFileImageQuestion) {
                if (newFileImageQuestion === null) return;

                let reader = new FileReader();
                let vm = this;
                reader.onload = function (e) {
                    vm.imageUrl = e.target.result;
                };
                reader.readAsDataURL(newFileImageQuestion);
            }
        },
        methods: {

            createQuestion: function () {
                this.addImage();

                let question = {
                    question: this.textQuestion,
                    answer: ([this.Types.WRITE, this.Types.SELECT].includes(this.type)) ? this.textAnswers[0].text : this.textAnswers.map(it => it.text).join(' '),
                    answers: ([this.Types.WRITE, this.Types.SELECT].includes(this.type)) ? [] : this.textAnswers.map(it => it.text).filter((it, index) => index < this.getAnswerSize()),
                    others: ([this.Types.WRITE, this.Types.COMPLETE].includes(this.type)) ? [] : this.textOthers.map(it => it.text).filter((it, index) => index < this.getOtherSize()).map(it => this.isAuto ? '自動生成' : it),
                    explanation: this.textExplanation,
                    imageRef: this.imageRef,
                    auto: this.isAuto,
                    type: this.type,
                    checkOrder: this.isCheckOrder,
                    order: (this.questionId === "") ? this.questions.length : this.order,
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                };

                if (this.questionId === "") {
                    firebase.firestore().collection("tests").doc(this.testId).collection("questions").add(
                        question
                    ).then(() => {
                        firebase.firestore().collection("tests").doc(this.testId).update({
                            size: this.questions.length + 1,
                        });
                        this.fetchQuestions();
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                } else {
                    firebase.firestore().collection("tests").doc(this.testId).collection("questions").doc(this.questionId).set(
                        question
                    ).then(() => {
                        this.fetchQuestions();
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                }
                this.clearForm();

            },

            fetchQuestions: function () {
                this.questions = [];
                this.loading = true;
                firebase.firestore().collection("tests").doc(this.testId).collection("questions").limit(300).orderBy("order").get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        this.questions.push(
                            {
                                id: doc.id,
                                question: doc.data().question,
                                answer: doc.data().answer,
                                answers: doc.data().answers,
                                others: doc.data().others,
                                explanation: doc.data().explanation,
                                imageRef: doc.data().imageRef,
                                type: doc.data().type,
                                auto: doc.data().auto,
                                checkOrder: doc.data().checkOrder,
                                order: doc.data().order
                            }
                        )
                    });
                    this.loading = false;
                });
            },

            editQuestion(question) {
                this.clearForm();

                this.questionId = question.id;
                this.textQuestion = question.question;
                this.type = question.type;
                switch (question.type) {
                    case this.Types.WRITE:
                    case this.Types.SELECT:
                        this.textAnswers.splice(0, 1, {text: question.answer});
                        break;
                    case this.Types.COMPLETE:
                    case this.Types.SELECT_COMPLETE:
                        question.answers.forEach((it, index) => {
                            this.textAnswers.splice(index, 1, {text: it});
                        });
                        break;
                }
                question.others.forEach((it, index) => {
                    this.textOthers.splice(index, 1, {text: it});
                });
                this.imageRef = question.imageRef;
                this.textExplanation = question.explanation;
                this.isUseImage = question.imageRef !== "";
                this.isExplanation = question.explanation !== "";
                this.isAuto = question.auto;
                this.order = question.order;

                if (question.imageRef !== "") {
                    firebase.storage().ref().child(question.imageRef).getDownloadURL().then((url) => {
                        this.imageUrl = url;
                    });
                }
            },

            deleteQuestion: function (question) {
                if (window.confirm('問題 ' + question.question + 'を削除しますか？')) {
                    firebase.firestore().collection("tests").doc(this.testId).collection("questions").doc(question.id).delete().then(() => {
                        firebase.firestore().collection("tests").doc(this.testId).update({
                            size: this.questions.length - 1,
                        });
                        this.fetchQuestions();
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                }
            },

            getAnswerSize: function () {
                switch (this.type) {
                    case this.Types.WRITE:
                        return 1;
                    case this.Types.SELECT:
                        return 1;
                    case this.Types.COMPLETE:
                        return this.answerSize;
                    case this.Types.SELECT_COMPLETE:
                        if (this.answerSizeSelectComplete > this.otherSizeSelectComplete) {
                            return this.otherSizeSelectComplete
                        } else {
                            return this.answerSizeSelectComplete
                        }
                }
                return 1;
            },

            getOtherSize: function () {
                switch (this.type) {
                    case this.Types.WRITE:
                        return 0;
                    case this.Types.SELECT:
                        return this.otherSize;
                    case this.Types.COMPLETE:
                        return 0;
                    case this.Types.SELECT_COMPLETE:
                        return this.otherSizeSelectComplete - this.answerSizeSelectComplete
                }
                return 3;
            },

            clearForm() {
                this.questionId = "";
                this.textQuestion = "";
                this.textAnswers = [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}];
                this.textOthers = [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}];
                this.textExplanation = "";
                this.fileImageQuestion = null;
                this.order = 0;
                this.imageRef = "";
                this.imageUrl = "";
            },

            validate: function () {
                if (this.textQuestion === "") return false;
                if (this.textAnswers.some((it, index) => it.text === "" && index < this.getAnswerSize())) return false;
                if (this.textOthers.some((it, index) => it.text === "" && index < this.getOtherSize() && !this.isAuto)) return false;
                return true;
            },

            addImage: function () {
                if (this.fileImageQuestion === null) return;

                if (this.fileImageQuestion.size > 1000000) {
                    window.alert("ファイルサイズは1MB以下にしてください");
                } else {
                    this.imageRef = firebase.auth().currentUser.uid + '/' + new Date().getTime();
                    firebase.storage().ref().child(this.imageRef).put(this.fileImageQuestion, {contentType: 'image/jpeg'}).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((url) => {
                            this.imageUrl = url;
                        });
                    });
                }
            },
        }
    }
</script>

<style scoped>
  .image {
    max-width: 48px;
    max-height: 48px;
  }
</style>
