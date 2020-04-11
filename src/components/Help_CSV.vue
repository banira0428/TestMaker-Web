<template>
  <div class="p-3">
    <div class="border-bottom pb-1 mb-3">
      <h1 class="h2 d-inline">CSV形式で問題集を編集する</h1>
    </div>

    <p>大量の問題をまとめて編集したい時は、エクセルやスプレッドシートのような表計算ソフトでの編集がオススメです。以下に、各問題形式とCSV形式との対応について解説します。</p>

    <b-card no-body class="mb-1" v-for="(item,index) in items" v-bind:key="index">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button class="text-left pl-3 h-100 d-flex align-items-center" block href="#" v-b-toggle="String(index)"
                  variant="light">
          {{item.question}}
        </b-button>
      </b-card-header>
      <b-collapse v-bind:id="String(index)" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
            <span v-html="item.answer"></span>
          </b-card-text>
          <img class="help-img" alt="help" v-bind:src="item.img"/>
        </b-card-body>
      </b-collapse>
    </b-card>
    <p class="mt-3">編集が完了した後は、完成した表をCSV形式でエクスポートしていただき、アプリ内の「ファイルのインポート」から、問題集として保存することができます。</p>
  </div>
</template>

<script>
    export default {
        name: "Help_CSV.vue",
        data() {
            return {
                items: [
                    {
                        question: "記述問題を作成する",
                        answer: "「記述」、問題文、解答　の順に入力してください",
                        img: require("../assets/help-csv-1.png"),
                    },
                    {
                        question: "選択問題を作成する",
                        answer: "「選択」、問題文、解答、他の選択肢　の順に入力してください（~6択まで作成可）",
                        img: require("../assets/help-csv-2.png"),
                    },
                    {
                        question: "完答問題を作成する",
                        answer: "「記述A」、問題文、解答（4つまで作成可）の順に入力してください",
                        img: require("../assets/help-csv-3.png"),
                    },
                    {
                        question: "選択完答問題を作成する",
                        answer: "「選択完答」、問題文、解答の数、他の選択肢の数、答え、他の選択肢　の順に入力してください（~6択まで作成可）",
                        img: require("../assets/help-csv-4.png"),
                    },
                    {
                        question: "解説つきの問題を作成する",
                        answer: "問題に解説を付けたい時は、該当の問題の下の行に「解説」、解説文　の順に入力してください",
                        img: require("../assets/help-csv-5.png"),
                    },
                    {
                        question: "選択問題を作成する（自動生成ON）",
                        answer: "「選択A」、問題文、解答、他の選択肢の数　の順に入力してください（~6択まで作成可）",
                        img: require("../assets/help-csv-6.png"),
                    },
                    {
                        question: "選択完答問題を作成する（自動生成ON）",
                        answer: "「選択完答A」、問題文、他の選択肢の数、答え　の順に入力してください（~6択まで作成可）",
                        img: require("../assets/help-csv-7.png"),
                    },
                    {
                        question: "文中に「,（コンマ）」や改行が含まれる場合",
                        answer: "「,」は「&lt;comma>」、改行文字は「&lt;br>」で置換してください",
                        img: require("../assets/help-csv-8.png"),
                    },
                ]
            }
        }
    }
</script>

<style scoped>

  .help-img{
    max-width: 100%;
  }

</style>
