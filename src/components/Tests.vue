<template>
    <div class="hello">
        <div id="content">
            <div id="form-test">
                <div class="card">
                    <div class="card-content">
                        <div class="area">
                            <label class="ef">
                                    <textarea rows="1" wrap="soft" id="text-test-title" v-model="testName"
                                              placeholder="新しい問題集のタイトル"></textarea>
                            </label>
                        </div>
                        <button id="save-test" class="btn wide" type="button"
                                v-on:click="createTest()" v-bind:disabled='testName === ""'>追加して保存
                        </button>
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

            <div id="tests" class="tests" v-for="test in tests" v-bind:key="test.id">
                <div class="card clickable">
                    <div class="card-content">
                        <a class="test-name deco-none" v-on:click="toQuestions(test.id)">
                            <div class="test">{{test.name}}</div>
                        </a>
                        <button class="delete-test btn-rect-border" type="button" v-on:click="deleteTest(test)">削除
                        </button>
                    </div>
                </div>
            </div>

            <div class="loader" v-if="loading">Loading...</div>

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
