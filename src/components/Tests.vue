<template>
  <div class="hello">
    <div id="content">
      <b-card>
        <b-form>
          <b-form-group
            id="input-group-1"
            label="問題集のタイトル"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="testName"
              type="text"
              required
              placeholder="問題集のタイトル"
            ></b-form-input>
          </b-form-group>

          <b-button block variant="primary" v-on:click="createTest()" v-bind:disabled='testName === ""'>
            追加して保存
          </b-button>
        </b-form>
      </b-card>

      <div id="ad">
        <a href="https://px.a8.net/svt/ejp?a8mat=35Q274+AEHOAA+3CWI+NV1XD" rel="nofollow">
          <img border="0" width="320" height="50" alt=""
               src="https://www25.a8.net/svt/bgt?aid=191012512629&wid=001&eno=01&mid=s00000015669004008000&mc=1"></a>
        <img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=35Q274+AEHOAA+3CWI+NV1XD"
             alt="">
      </div>

      <div v-for="test in tests" v-bind:key="test.id">
        <b-card>
          <b-row>
            <b-col md="8">
              <b-card-text text-tag="h2">{{test.name}}</b-card-text>
            </b-col>
            <b-col md="2">
              <b-button block variant="primary" v-on:click="toQuestions(test.id)">編集</b-button>
            </b-col>
            <b-col md="2">
              <b-button block variant="danger" v-on:click="deleteTest(test)">削除</b-button>
            </b-col>
          </b-row>
        </b-card>
      </div>

      <b-row>
        <b-col md="5"></b-col>
        <b-col md="2">
          <b-spinner variant="primary" label="Spinning" v-if="loading"/>
        </b-col>
        <b-col md="5"></b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
    import firebase from 'firebase';

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

            toQuestions: function (id) {
                this.$router.push({path: `/questions/${id}`});
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
