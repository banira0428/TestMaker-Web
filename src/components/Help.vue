<template>
  <div class="p-3">
    <div class="border-bottom pb-1 mb-3">
      <h1 class="h2 d-inline">よくある質問</h1>
    </div>

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
        </b-card-body>
      </b-collapse>
    </b-card>

    <div class="text-center mt-3">
      その他ご不明な点があれば、<a href="mailto:testmaker.contact@gmail.com">こちら</a>までご連絡ください
    </div>

  </div>
</template>

<script>
    export default {
        name: "Help",
        data() {
            return {
                items: [
                    {
                        question: "問題集をPCから編集したい",
                        answer: "<a href='/'>こちら</a>から問題集の編集を行うことができます（利用にはログインが必要です）。また、作成した問題集はアプリ内の「みんなの問題集」→「マイページ」からダウンロードできます。"
                    },
                    {
                        question: "問題をまとめて編集したい",
                        answer: "大量の問題集を作成する場合，CSV形式での編集がオススメです。詳しくは<a href='/help/csv'>こちら</a>"
                    },
                    {
                        question: "「アップロードしてリンクを共有」と「テキスト形式に変換して共有」の違い",
                        answer: "前者は「みんなの問題集」にアップロードした後にそのリンクを共有し、後者は問題集をCSVデータに変換し、テキストとして共有します。（「コピペで読み込む」機能で復元できます）"
                    },
                    {
                        question: "「みんなの問題集」に投稿した問題集を削除したい",
                        answer: "投稿した問題集の削除は「みんなの問題集」→「マイページ」より、行うことができます。"
                    },
                    {
                        question: "Android版と比較して、iOS版に不足している機能がある",
                        answer: "開発者が「Android版の開発」→「iOS版への移植」という形で開発を進めているので、実装が後追いになっているからです。申し訳ございません。"
                    },



                ]
            }
        }
    }
</script>

<style scoped>
</style>
