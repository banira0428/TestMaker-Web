<template>
  <div class="p-3 pb-3">
    <div class="border-bottom pb-1">
        <h1 class="h2 d-inline">問題集一覧</h1>
        <b-spinner class="ml-2" variant="primary" label="Spinning" v-if="loading"/>
    </div>

    <b-card-group class="mt-3">
      <b-col md="4" class="mt-3">
        <b-card>
          <b-card-title class="single">問題集の追加</b-card-title>
          <b-row class="mt-1">
            <b-col md="7">
              <b-form-input
                class="mt-1"
                id="input-1"
                v-model="testName"
                type="text"
                required
                placeholder="問題集のタイトル"
              ></b-form-input>
            </b-col>
            <b-col md="5">
              <b-button class="mt-1" block variant="outline-primary" v-on:click="createTest()"
                        v-bind:disabled='testName === ""'>
                保存
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>

      <div v-for="test in tests" v-bind:key="test.id" class="col-md-4 mt-3">
        <b-card>
          <b-card-title class="single">{{test.name}}</b-card-title>
          <b-row>
            <b-col class="mt-1" md="7">
              <b-button block variant="outline-primary" v-on:click="toQuestions(test)">編集</b-button>
            </b-col>
            <b-col class="mt-1" md="5">
              <b-button block variant="outline-danger" v-on:click="deleteTest(test)">削除</b-button>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-card-group>

    <div id="ad">
      <a href="https://px.a8.net/svt/ejp?a8mat=35Q274+AEHOAA+3CWI+NV1XD" rel="nofollow">
        <img border="0" width="320" height="50" alt=""
             src="https://www25.a8.net/svt/bgt?aid=191012512629&wid=001&eno=01&mid=s00000015669004008000&mc=1"></a>
      <img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=35Q274+AEHOAA+3CWI+NV1XD"
           alt="">
    </div>
  </div>
</template>

<script>
    import firebase from 'firebase';
    import store from "../store";

    export default {

        name: 'Tests',
        data: function () {
            return {
                tests: [],
                loading: true,
                user: firebase.auth().currentUser,
                testName: ""
            }
        },
        created: function () {
            this.fetchTests();
        },
        methods: {

            toQuestions: function (test) {
                store.commit('setTest',test);
                this.$router.push({path: `/questions`});
            },

            createTest: function () {
                let test = {
                    name: this.testName,
                    color: 0,
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                    locale: document.documentElement.lang,
                    overview: "",
                    size: 0,
                    userId: this.user.uid,
                    userName: this.user.displayName
                };

                firebase.firestore().collection("tests").add(test)
                    .then(() => {
                        this.fetchTests();
                        this.testName = "";
                    }).catch(function (error) {
                    console.error("Error adding document: ", error);
                });

            },

            fetchTests: function () {
                this.tests = [];
                this.loading = true;
                firebase.firestore().collection("tests").limit(50).where('userId', '==', this.user.uid).get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            this.tests.push(
                                {
                                    id: doc.id,
                                    name: doc.data().name
                                }
                            )
                        });
                        this.loading = false;
                    });
            },

            deleteTest: function (test) {
                if (window.confirm('問題集 ' + test.name + 'を削除しますか？')) {
                    firebase.firestore().collection("tests").doc(test.id).delete()
                        .then(this.fetchTests())
                        .catch(function (error) {
                            console.error("Error adding document: ", error);
                        });
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
