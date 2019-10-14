<template>
  <div class="content-about">
    <h2>このサイトについて</h2>
    <p>このサイトは，スマートフォンアプリ「暗記メーカー」(<a
      href="https://play.google.com/store/apps/details?id=jp.gr.java_conf.foobar.testmaker.service&hl=ja" target="_blank">Android版</a>, <a
      href="https://apps.apple.com/jp/app/%E3%83%86%E3%82%B9%E3%83%88%E5%8B%89%E5%BC%B7%E7%94%A8%E3%82%A2%E3%83%97%E3%83%AA-%E6%9A%97%E8%A8%98%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC/id1201200202?mt=8" target="_blank">iOS版</a>)
      の問題作成をPCで効率的に行うためのサイトです。現在は問題作成機能しか実装していないので、その他の機能は要望に応じて順次追加して行こうと思います。</p>
    <h2>アプリとの連携</h2>
    <p>アプリ内の「みんなの問題集」→「マイページ」より、このサイトで作成した問題集をダウンロードすることができます。（ログインするアカウントを一致させてください）</p>
    <h2>注意事項</h2>
    <p>ここで作成した問題集は、自動的に「みんなの問題集」上に投稿されますので、人に見られたら困る内容を書き込まないでください。</p>
    <h2>問い合わせ</h2>
    <p>不具合の報告，追加機能の要望等は<a href="https://twitter.com/keita_developer" target="_blank">開発者</a>にご連絡ください</p>
    <h2>利用規約</h2>
    <p><router-link to="/terms">こちら</router-link>をご覧ください</p>
  </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>
