<template>
  <div class="h-100 bg-dark mt-0 ">
    <div class="text-center">
      <img class="overflow-hidden text-center shot " src="../assets/screenShot.png" alt>
    </div>
    <div class="text-center mt-sm-3">
      <h1 class="h2">テスト勉強用アプリ「暗記メーカー」</h1>
      <div class="pb-3">
        <a
          class="mr-2"
          href="https://play.google.com/store/apps/details?id=jp.gr.java_conf.foobar.testmaker.service&hl=ja&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img
          src="../assets/googleplay.png"
          alt="Google Play で手に入れよう"
        ></a>
        <a
          class="ml-2"
          href="https://apps.apple.com/jp/app/%E3%83%86%E3%82%B9%E3%83%88%E5%8B%89%E5%BC%B7%E7%94%A8%E3%82%A2%E3%83%97%E3%83%AA-%E6%9A%97%E8%A8%98%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC/id1201200202?mt=8"><img
          src="../assets/appstore.png"
          alt="App Store"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
  .shot {
    min-width: 320px;
    width: 40%;
  }
  h1 {
    text-shadow: -1px 1px 5px #452b2a;
    color: #fff;
    font-size: 3.2rem;
    line-height: 1.8;
    letter-spacing: 2px;
    font-family: "Hiragino Kaku Gothic ProN", sans-serif;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 1.6rem;
    }
  }



</style>
