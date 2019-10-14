<template>
    <div id="form-question">
        <div class="card">
            <div class="card-content">

                <div id="form-header">
                    <p id="form-header-title">問題の編集</p>
                    <button id="cancel-question" class="btn" type="button" v-show='questionId !== ""'
                            @click="clearForm()">編集内容の破棄
                    </button>
                </div>

                <div id="form-question-tab">
                    <div class="tabs">
                        <input id="write" type="radio" name="tab_item" value="0" v-bind:checked="type === Types.WRITE"
                               v-on:click="type = Types.WRITE">
                        <label class="tab_item" for="write">記述</label>
                        <input id="select" type="radio" name="tab_item" value="1" v-bind:checked="type === Types.SELECT"
                               v-on:click="type = Types.SELECT">
                        <label class="tab_item" for="select">選択</label>
                        <input id="complete" type="radio" name="tab_item" value="2"
                               v-bind:checked="type === Types.COMPLETE"
                               v-on:click="type = Types.COMPLETE">
                        <label class="tab_item" for="complete">完答</label>
                        <input id="select-complete" type="radio" name="tab_item" value="3"
                               v-bind:checked="type === Types.SELECT_COMPLETE"
                               v-on:click="type = Types.SELECT_COMPLETE">
                        <label class="tab_item" for="select-complete">選択完答</label>
                        <div class="tab_content">

                            <div id="group-text-question-question">
                                <div class="area">
                                    <label class="ef">
                                        <textarea rows="1" wrap="soft" id="text-question-question"
                                                  placeholder="問題文" v-model="textQuestion"></textarea>
                                    </label>
                                </div>
                            </div>

                            <div id="group-text-question-answers" v-for="(textAnswer,index) in textAnswers"
                                 v-bind:key="index">
                                <div class="area correct"
                                     v-if="index < getAnswerSize()">
                                    <label class="ef">
                                        <textarea rows="1" wrap="soft"
                                                  v-bind:placeholder="'解答' + (index+1)"
                                                  v-model="textAnswer.text">
                                        </textarea>
                                    </label>
                                </div>
                            </div>

                            <div v-if="type === Types.SELECT || type === Types.SELECT_COMPLETE">
                                <div id="group-text-question-others"
                                     v-for="(textOther,index) in textOthers"
                                     v-bind:key="index">
                                    <div class="area other"
                                         v-if="index < getOtherSize()">
                                        <label class="ef">
                                             <textarea rows="1" wrap="soft" id="text-question-other-1"
                                                       v-bind:placeholder="(isAuto) ? '自動生成' : '他の選択肢'"
                                                       v-model="textOther.text" v-bind:disabled="isAuto">
                                             </textarea>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div id="group-text-question-explanation" class="area" v-if="isExplanation">
                                <label class="ef">
                                    <textarea rows="1" wrap="soft" id="text-question-explanation" placeholder="解説"
                                              v-model="textExplanation">

                                    </textarea>
                                </label>
                            </div>

                            <div id="group-image-question" v-if="isUseImage">
                                <div id="image-question" class="clickable" @click.stop="$refs.imageQuestion.click()">
                                    <img v-bind:src="imageUrl" class="image"/>
                                    {{textImageRef}}
                                </div>
                                <p id="message-image">{{textImageUploadState}}</p>
                                <input type="file" id="files" ref="imageQuestion" v-show="false" @change="addImage"/>
                            </div>

                            <button id="save-question" class="btn wide" type="button" @click="createQuestion()"
                                    v-bind:disabled="!validate()">{{validate() ? ((questionId !== "") ? '上書き保存' :
                                '追加して保存') : "未入力のフォームがあります"}}
                            </button>

                            <details id="detail">
                                <summary>詳細設定</summary>

                                <div class="check" id="check-explanation-layout">
                                    <input type="checkbox" id="check-explanation"
                                           v-model="isExplanation"/>
                                    <label for="check-explanation">解説文を入れる</label>
                                </div>

                                <div class="check" id="check-image-layout">
                                    <input type="checkbox" id="check-image"
                                           v-model="isUseImage"/>
                                    <label for="check-image">画像を添付する</label>
                                </div>

                                <div class="check" id="check-check-order-layout" v-if="type === Types.COMPLETE">
                                    <input type="checkbox" id="check-check-order" v-model="isCheckOrder"/>
                                    <label for="check-check-order">解答順序を判定に含める</label>
                                </div>

                                <div class="check" id="check-auto-layout"
                                     v-if="type === Types.SELECT || type === Types.SELECT_COMPLETE">
                                    <input type="checkbox" id="check-auto" v-model="isAuto"/>
                                    <label for="check-auto">選択肢の自動生成</label>
                                </div>

                                <div class="spinner cp_sl01 " v-if="type === Types.SELECT">
                                    <select name="select-complete-select-size" id="select-other-size"
                                            v-model="otherSize">
                                        <option v-for="(n) in 5" v-bind:key="n" v-bind:value="n"
                                                v-bind:selected="n === 3">選択肢数 {{n+1}}
                                        </option>
                                    </select>
                                </div>
                                <div class="spinner cp_sl01 " v-if="type === Types.COMPLETE">
                                    <select name="select-complete-answer-size"
                                            id="select-complete-answer-size" v-model="answerSize">
                                        <option v-for="(n) in 3" v-bind:key="n" v-bind:value="n+1"
                                                v-bind:selected="n === 2">解答数 {{n+1}}
                                        </option>
                                    </select>
                                </div>
                                <div class="spinner cp_sl01 " v-if="type === Types.SELECT_COMPLETE">
                                    <select name="select-complete-answer-size"
                                            id="select-select-complete-answer-size" v-model="answerSizeSelectComplete">
                                        <option v-for="(n) in 7" v-bind:key="n" v-bind:value="n-1"
                                                v-bind:selected="n === 3">解答数 {{n-1}}
                                        </option>
                                    </select>
                                </div>
                                <div class="spinner cp_sl01" v-if="type === Types.SELECT_COMPLETE">
                                    <select name="select-complete-select-size"
                                            id="select-answer-other-size" v-model="otherSizeSelectComplete">
                                        <option v-for="(n) in 5" v-bind:key="n" v-bind:value="n"
                                                v-bind:selected="n === 3">選択肢数 {{n+1}}
                                        </option>
                                    </select>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="ad">
            <a href="https://px.a8.net/svt/ejp?a8mat=35Q274+AEHOAA+3CWI+NV1XD" rel="nofollow">
                <img border="0" width="320" height="50" alt=""
                     src="https://www25.a8.net/svt/bgt?aid=191012512629&wid=001&eno=01&mid=s00000015669004008000&mc=1"></a>
            <img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=35Q274+AEHOAA+3CWI+NV1XD"
                 alt="">
        </div>

        <div id="questions" class="questions" v-for="q in questions" v-bind:key="q.id">
            <div class="card clickable">
                <div class="card-content">
                    <a class="question-name deco-none" @click="editQuestion(q)">
                        <div class="question">
                            <p class="single">{{q.question}}</p>
                            <p class="single"> {{q.answer}} </p>
                        </div>
                    </a>
                    <button class="delete-question btn-rect-border" type="button" v-on:click="deleteQuestion(q)">削除
                    </button>
                </div>
            </div>
        </div>

        <div class="loader" v-if="loading">Loading...</div>

    </div>

</template>

<script>
    import firebase from 'firebase';

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
                testId: "",
                textQuestion: "",
                textAnswers: [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}],
                textOthers: [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}],
                textExplanation: "",
                textImageRef: "画像ファイルを選択",
                textImageUploadState: "",
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
                otherSizeSelectComplete: 2,
            }
        },
        mounted: function () {
            this.testId = this.$route.params.id;
            this.fetchQuestions();
        },
        methods: {

            createQuestion: function () {

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

                if(question.imageRef !== ""){
                    firebase.storage().ref().child(question.imageRef).getDownloadURL().then((url) => {
                        this.imageUrl = url;
                        this.textImageRef = "画像の差し替え";
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
                        return this.answerSizeSelectComplete
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
                        return this.otherSizeSelectComplete
                }
                return 3;
            },

            clearForm() {
                this.questionId = "";
                this.textQuestion = "";
                this.textAnswers = [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}];
                this.textOthers = [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}];
                this.textExplanation = "";
                this.textImageRef = "画像ファイルを選択";
                this.textImageUploadState = "";
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

            addImage: function (e) {
                this.textImageUploadState = "アップロード中";

                this.textImageRef = e.target.value.split("\\").slice(-1)[0].substr(0, 30);
                let file = e.target.files[0]; // FileList object

                if (file === undefined) {
                    if (this.imageUrl !== "") {
                        this.textImageRef = "画像の差し替え";
                    } else {
                        this.textImageRef = "画像ファイルを選択";
                    }
                    this.textImageUploadState = "";
                }

                if (file.size > 1000000) {
                    this.textImageUploadState = "ファイルサイズは1MB以下にしてください";
                } else {
                    this.imageRef = firebase.auth().currentUser.uid + '/' + new Date().getTime();
                    firebase.storage().ref().child(this.imageRef).put(file, {contentType: 'image/jpeg'}).then((snapshot) => {
                        this.textImageUploadState = "サーバー処理中";
                        snapshot.ref.getDownloadURL().then((url) => {
                            this.textImageUploadState = "";
                            this.imageUrl = url;
                            this.textImageRef = "画像の差し替え";
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
