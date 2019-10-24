<template>
  <div class="p-3">
    <div class="border-bottom pb-1 mb-3">
      <h1 class="h2 d-inline">暗記メーカー 利用規約</h1>
    </div>
    この規約は、お客様が、ke-ta の提供する「暗記メーカー」サービス（以下「本サービス」）をご利用頂く際の取扱いにつき定めるものです。本規約に同意した上で本サービスをご利用ください。
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第1条（定義）</h1>
    </div>
    本規約上で使用する用語の定義は、次に掲げるとおりとします。
    <b-table class="mb-3 mt-3" fixed outlined :items="defines" :fields="fields"></b-table>
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第2条（当社の役割・立場）</h1>
    </div>

    <b-list-group>
      <b-list-group-item>
        1 本サービスは、ユーザー間における問題集の共有のための場・機会を提供することを内容とするものです。そのため、当社は、別途特に定めた場合を除き、投稿している問題集の内容についての責任に関しては一切関与いたしません。
      </b-list-group-item>
    </b-list-group>


    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第3条（サービスの内容）</h1>
    </div>

    <b-list-group>
      <b-list-group-item>
        1 当社は、本サービスにおいて、問題集をユーザー間で共有するためのサービスを提供します。
      </b-list-group-item>
    </b-list-group>

    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第4条（本規約への同意）</h1>
    </div>

    <b-list-group>
      <b-list-group-item>
        1 利用者は、本利用規約に同意頂いた上で、本サービスを利用できるものとします。
      </b-list-group-item>
      <b-list-group-item>
        2 利用者が、本サービスをスマートフォンその他の情報端末にダウンロードし、本規約への同意手続を行った時点で、利用者と当社との間で、本規約の諸規定に従った利用契約が成立するものとします。
      </b-list-group-item>
      <b-list-group-item>
        3 利用者が未成年者である場合には、親権者その他の法定代理人の同意を得たうえで、本サービスをご利用ください。
      </b-list-group-item>
      <b-list-group-item>
        4
        未成年者の利用者が、法定代理人の同意がないにもかかわらず同意があると偽りまたは年齢について成年と偽って本サービスを利用した場合、その他行為能力者であることを信じさせるために詐術を用いた場合、本サービスに関する一切の法律行為を取り消すことは出来ません。
      </b-list-group-item>
      <b-list-group-item>
        5 本規約の同意時に未成年であった利用者が成年に達した後に本サービスを利用した場合、当該利用者は本サービスに関する一切の法律行為を追認したものとみなされます。
      </b-list-group-item>
    </b-list-group>
     
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第5条（規約の変更）</h1>
    </div>

    <b-list-group>
      <b-list-group-item>
        1 当社は、利用者の承諾を得ることなく、いつでも、本規約の内容を改定することができるものとし、利用者はこれを異議なく承諾するものとします。
      </b-list-group-item>
      <b-list-group-item>
        2 当社は、本規約を改定するときは、その内容について当社所定の方法により利用者に通知します。
      </b-list-group-item>
      <b-list-group-item>
        3 前本規約の改定の効力は、当社が前項により通知を行った時点から生じるものとします。
      </b-list-group-item>
      <b-list-group-item>
        4 利用者は、本規約変更後、本サービスを利用した時点で、変更後の本利用規約に異議なく同意したものとみなされます。
      </b-list-group-item>
    </b-list-group>
     
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第6条（入会手続）</h1>
    </div>

    <b-list-group>
      <b-list-group-item>
        1 本サービスへの入会を希望する方（以下「登録希望者」）は、本規約に同意した上で、所定の方法で入会の申込を行ってください。
      </b-list-group-item>
      <b-list-group-item>
        2 入会の申込をした方は、当社がその申込を承諾し、ＩＤ登録が完了した時点から登録ユーザーとなります。
      </b-list-group-item>
      <b-list-group-item>
        3 当社は、登録希望者が次の各号のいずれか一つに該当する場合は、当社の判断により入会申込を承諾しないことがあります。
        <b-list-group class="mt-2">
          <b-list-group-item>
            一 登録希望者が、当社の定める方法によらず入会の申込を行った場合
          </b-list-group-item>
          <b-list-group-item>
            二 登録希望者が、過去に本規約または当社の定めるその他の利用規約等に違反したことを理由として退会処分を受けた者である場合
          </b-list-group-item>
          <b-list-group-item>
            三 登録希望者が、不正な手段をもって登録を行っていると当社が判断した場合
          </b-list-group-item>
          <b-list-group-item>
            四 登録希望者が、本人以外の情報を登録している場合
          </b-list-group-item>
          <b-list-group-item>
            五 その他当社が不適切と判断した場合
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
    </b-list-group>

    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第7条（アカウントの管理）</h1>
    </div>

    <b-list-group>
      <b-list-group-item>
        1
        利用者は、利用に際して登録した情報（以下、「登録情報」といいます。メールアドレスやID・パスワード等を含みます）について、自己の責任の下、任意に登録、管理するものとします。利用者は、これを第三者に利用させ、または貸与、譲渡、名義変更、売買などをしてはならないものとします。
      </b-list-group-item>
      <b-list-group-item>
        2 当社は、登録情報によって本サービスの利用があった場合、利用登録をおこなった本人が利用したものと扱うことができ、当該利用によって生じた結果ならびにそれに伴う一切の責任については、利用登録を行った本人に帰属するものとします。
      </b-list-group-item>
      <b-list-group-item>
        3 利用者は、登録情報の不正使用によって当社または第三者に損害が生じた場合、当社および第三者に対して、当該損害を賠償するものとします。
      </b-list-group-item>
      <b-list-group-item>
        4 登録情報の管理は、利用者が自己の責任の下で行うものとし、登録情報が不正確または虚偽であったために利用者が被った一切の不利益および損害に関して、当社は責任を負わないものとします。
      </b-list-group-item>
      <b-list-group-item>
        5 登録情報が盗用されまたは第三者に利用されていることが判明した場合、利用者は直ちにその旨を当社に通知するとともに、当社からの指示に従うものとします。  
      </b-list-group-item>
    </b-list-group>

    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第8条（退会手続）</h1>
    </div>

    <b-list-group>
      <b-list-group-item>
        1 登録ユーザーが退会を希望する場合、登録ユーザーは当社所定の方法により退会の手続を行ってください。
      </b-list-group-item>
      <b-list-group-item>
        2 当社は、登録ユーザーが次の各号のいずれか一つに該当する場合、当社の判断により強制的に退会いただきます。
        <b-list-group class="mt-2">
          <b-list-group-item>
            一 当社の定める方法によらずユーザー登録を行ったことが明らかとなった場合
          </b-list-group-item>
          <b-list-group-item>
            二 本規約または当社の定めるその他の利用規約等に違反した場合
          </b-list-group-item>
          <b-list-group-item>
            三 その他当社が不適切と判断した場合
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
    </b-list-group>
       
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第9条（禁止行為）</h1>
    </div>
    本サービスの利用に際し、当社は、利用者（以下「利用者」）に対し、次に掲げる行為を禁止します。違反した場合、事前通知をすることなく、即時に利用停止、登録情報・投稿の削除等、当社が必要と判断した措置を取ることができます。
    <b-list-group>
      <b-list-group-item>
        1 当社または第三者の知的財産権を侵害する行為
      </b-list-group-item>
      <b-list-group-item>
        2 当社または第三者の名誉・信用を毀損または不当に差別もしくは誹謗中傷する行為
      </b-list-group-item>
      <b-list-group-item>
        3 当社または第三者の財産を侵害する行為、または侵害する恐れのある行為
      </b-list-group-item>
      <b-list-group-item>
        4 当社または第三者に経済的損害を与える行為
      </b-list-group-item>
      <b-list-group-item>
        5 当社または第三者に対する脅迫的な行為
      </b-list-group-item>
      <b-list-group-item>
        6 利用者が、以下の情報を投稿すること
        <b-list-group class="mt-2">
          <b-list-group-item>
            一 第三者の権利および財産に対して損害を与えるリスクのある情報
          </b-list-group-item>
          <b-list-group-item>
            二 第三者に対して有害な情報、第三者を身体的・心理的に傷つける情報
          </b-list-group-item>
          <b-list-group-item>
            三 犯罪や不法行為、危険行為に属する情報およびそれらを教唆、幇助する情報
          </b-list-group-item>
          <b-list-group-item>
            四 不法、有害、脅迫、虐待、人種差別、中傷、名誉棄損、侮辱、ハラスメント、扇動、不快を与えることを意図し、もしくはそのような結果を生じさせる恐れのある内容をもつ情報
          </b-list-group-item>
          <b-list-group-item>
            五 事実に反する、または存在しないと分かっている情報
          </b-list-group-item>
          <b-list-group-item>
            六 利用者自身がコントロール可能な権利を持たない情報
          </b-list-group-item>
          <b-list-group-item>
            七 第三者の著作権を含む知的財産権やその他の財産権を侵害する情報、公共の利益または個人の権利を侵害する情報
          </b-list-group-item>
          <b-list-group-item>
            八 わいせつ、児童ポルノまたは児童虐待にあたる画像、文書等の情報
          </b-list-group-item>
          <b-list-group-item>
            九 医師法などの法令に違反する情報
          </b-list-group-item>
          <b-list-group-item>
            十 その他当社が不適切と判断する情報
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
      <b-list-group-item>
        7 コンピューターウィルス、有害なプログラムを仕様またはそれを誘発する行為
      </b-list-group-item>
      <b-list-group-item>
        8 本サービス用インフラ設備に対して過度な負担となるストレスをかける行為
      </b-list-group-item>
      <b-list-group-item>
        9 当サイトのサーバーやシステム、セキュリティへの攻撃
      </b-list-group-item>
      <b-list-group-item>
        10 当社提供のインターフェース以外の方法で当社サービスにアクセスを試みる行為
      </b-list-group-item>
      <b-list-group-item>
        11 一人の利用者が、複数の利用者IDを取得する行為
      </b-list-group-item>
      <b-list-group-item>
        12 上記の他、当社が不適切と判断する行為
      </b-list-group-item>
    </b-list-group>
     
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第10条 （コンテンツの取り扱い）</h1>
    </div>

    <b-list-group>
      <b-list-group-item>
        1 本サービスで提供される全てのコンテンツに関する権利は当社が有しており､利用者に対しては、譲渡及び再許諾できない、非独占的な本サービスの利用を許諾するものとします。
      </b-list-group-item>
      <b-list-group-item>
        2
        利用者は､当社の定める使用範囲を超えていかなる方法によっても複製､送信､譲渡（利用者同士の売買も含みます）､貸与､翻訳､翻案、無断で転載、二次使用、営利目的の使用、改変、逆アセンブル、逆コンパイル、リバースエンジニアリング等を行うことを禁止します。
      </b-list-group-item>
      <b-list-group-item>
        3 第1項にかかわらず､退会等により利用者が利用者資格を喪失した場合は､提供されたコンテンツの利用権も消滅するものとします｡
      </b-list-group-item>
      <b-list-group-item>
        4
        登録ユーザーは、第三者の著作権を侵すことのないよう、投稿を行わなければなりません。インターネット、ＴＶ、雑誌、書籍などの各種情報媒体からの文章等の無断転載は禁じます。ただし、事前に権利保有者の許諾を得た場合には、この限りではありません。
      </b-list-group-item>
      <b-list-group-item>
        5
        登録ユーザーが、本サービス上に投稿その他の方法で送信したコンテンツ（静止画、動画、文字情報その他一切の情報）に関する著作権（著作権法第21条ないし同第28条に規定する権利を含む全ての著作権を含む。）については利用者に帰属するものとします。ただし、利用者は、コンテンツの送信時に、当社に対し、日本国内外において、当該コンテンツを無償かつ非独占的に使用することを許諾します。
      </b-list-group-item>
      <b-list-group-item>
        6 利用者は本サービス内では、著作者人格権を行使しないものとします。
      </b-list-group-item>
    </b-list-group>
     
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第11条（免責）</h1>
    </div>
    <b-list-group>

      <b-list-group-item>
        1 当社は、個別取引において売買される商品の内容、品質、適法性、安全性、有用性などについては、一切保証いたしません。そのため、商品に瑕疵・不具合などがあった場合でも、当社は一切の責任を負わないものとします。
      </b-list-group-item>
      <b-list-group-item>
        2 当社は、個別取引に関する商品の引渡しまたは代金の支払い可能性に関し、一切保証いたしません。そのため、個別取引において、商品の引渡しがないまたは代金の支払いがない場合であっても、当社は一切の責任を負わないものとします。
      </b-list-group-item>
      <b-list-group-item>
        3 利用者と他の利用者との間の論議・紛争その他のトラブルについて、当社は一切責任を負わないものとします。利用者と他の利用者でトラブルになった場合でも、両者同士の責任で解決するものとし、当社には一切の請求をしないものとします。
      </b-list-group-item>
      <b-list-group-item>
        4 当社は、本サービスの内容変更、中断、終了によって生じたいかなる損害についても、一切責任を負いません。
      </b-list-group-item>
      <b-list-group-item>
        5 当社は、利用者の本サービスの利用環境について一切関与せず、また一切の責任を負いません。
      </b-list-group-item>
      <b-list-group-item>
        6
        当社は、本サービスが利用者の特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、利用者による本サービスの利用が利用者に適用のある法令または業界団体の内部規則等に適合すること、および不具合が生じないことについて、何ら保証するものではありません。
      </b-list-group-item>
      <b-list-group-item>
        7
        当社は、本サービスが全ての情報端末に対応していることを保証するものではなく、本サービスの利用に供する情報端末のＯＳのバージョンアップ等に伴い、本サービスの動作に不具合が生じる可能性があることにつき、利用者はあらかじめ了承するものとします。当社は、かかる不具合が生じた場合に当社が行うプログラムの修正等により、当該不具合が解消されることを保証するものではありません。
      </b-list-group-item>
      <b-list-group-item>
        8 利用者は、AppStore、GooglePlay等のサービスストアの利用規約および運用方針の変更等に伴い、本サービスの一部又は全部の利用が制限される可能性があることをあらかじめ了承するものとします。
      </b-list-group-item>
      <b-list-group-item>
        9 当社は、本サービスを利用したことにより直接的または間接的に利用者に発生した損害について、一切賠償責任を負いません。
      </b-list-group-item>
      <b-list-group-item>
        10 当社は、利用者その他の第三者に発生した機会逸失、業務の中断その他いかなる損害（間接損害や逸失利益を含みます）に対して、当社が係る損害の可能性を事前に通知されていたとしても、一切の責任を負いません。
      </b-list-group-item>
      <b-list-group-item>
        11 他の利用者または第三者から投稿についての削除依頼があった時、当社の判断で削除の可否を決定できるものとし、当該判断により生じた一切の責任について、当社は責任を負わないものとします。
      </b-list-group-item>
      <b-list-group-item>
        12 第1項乃至前項の規定は、当社に故意または重過失が存する場合又は契約書が消費者契約法上の消費者に該当する場合には適用しません。
      </b-list-group-item>
      <b-list-group-item>
        13 前項が適用される場合であっても、当社は、過失（重過失を除きます。）による行為によって利用者に生じた損害のうち、特別な事情から生じた損害については、一切賠償する責任を負わないものとします。
      </b-list-group-item>
      <b-list-group-item>
        14 本サービスの利用に関し当社が損害賠償責任を負う場合、当該損害が発生した月に利用者から受領した利用額を限度として賠償責任を負うものとします。  
      </b-list-group-item>
      <b-list-group-item>
        15
        利用者は、本サービスの利用に関連し、他の利用者に損害を与えた場合または第三者との間に紛争を生じた場合、自己の費用と責任において、かかる損害を賠償またはかかる紛争を解決するものとし、当社には一切の迷惑や損害を与えないものとします。
      </b-list-group-item>
      <b-list-group-item>
        16
        利用者の行為により、第三者から当社が損害賠償等の請求をされた場合には、利用者の費用（弁護士費用）と責任で、これを解決するものとします。当社が、当該第三者に対して、損害賠償金を支払った場合には、利用者は、当社に対して当該損害賠償金を含む一切の費用（弁護士費用及び逸失利益を含む）を支払うものとします。
      </b-list-group-item>
      <b-list-group-item>
        17 利用者が本サービスの利用に関連して当社に損害を与えた場合、利用者の費用と責任において当社に対して損害を賠償（訴訟費用及び弁護士費用を含む）するものとします。
      </b-list-group-item>
      <b-list-group-item>
        18 本サービスで他の利用者が投稿した情報の正確性について、当社は保証しません。当社は、本サービスに掲載されている情報についての紛争及びトラブルについて一切の責任を負いません。  
      </b-list-group-item>
    </b-list-group>
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第12条（広告の掲載について）</h1>
    </div>
    利用者は、本サービス上にあらゆる広告が含まれる場合があること、当社またはその提携先があらゆる広告を掲載する場合があることを理解しこれを承諾したものとみなします。本サービス上の広告の形態や範囲は、当社によって随時変更されます。
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第13条（監視業務）</h1>
    </div>
    当社は、利用者が本サービスを適正に利用しているかどうかを監視する業務を当社の裁量により行うものとし、利用者はそれに同意するものとします。
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第14条（権利譲渡の禁止）</h1>
    </div>
    <b-list-group>
      <b-list-group-item>
        1 利用者は、予め当社の書面による承諾がない限り、本規約上の地位および本規約に基づく権利または義務の全部または一部を第三者に譲渡してはならないものとします。
      </b-list-group-item>
      <b-list-group-item>
        2 当社は、本サービスの全部または一部を当社の裁量により第三者に譲渡することができ、その場合、譲渡された権利の範囲内で利用者のアカウントを含む、本サービスに係る利用者の一切の権利が譲渡先に移転するものとします。  
      </b-list-group-item>
    </b-list-group>

    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第15条（分離可能性）</h1>
    </div>
    本規約のいずれかの条項又はその一部が、消費者契約法その他の法令等により無効又は執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効又は執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第16条（当社への連絡方法）</h1>
    </div>
    本サービスに関する利用者の当社へのご連絡・お問い合わせは、本サービスまたは当社が運営するwebサイト内の適宜の場所に設置するお問い合わせフォームからの送信または当社が別途指定する方法により行うものとします。
    <div class="border-bottom mb-3 mt-3">
      <h1 class="h5">第17条（準拠法、管轄裁判所）</h1>
    </div>

    <b-list-group>
      <b-list-group-item>
        1 本規約の有効性，解釈及び履行については，日本法に準拠し，日本法に従って解釈されるものとする。
      </b-list-group-item>
      <b-list-group-item>
        2 当社と利用者等との間での論議・訴訟その他一切の紛争については、訴額に応じて、東京簡易裁判所又は東京地方裁判所を専属的合意管轄裁判所とします｡
      </b-list-group-item>
    </b-list-group>
    2019年7月1日 施行
  </div>
</template>

<script>
    export default {
        name: "Terms",
        data() {
            return {
                fields: [{
                    key: 'word',
                    label: '用語',
                }, {
                    key: 'meaning',
                    label: '意味',
                }],
                defines: [
                    {word: "（1）本サービス", meaning: "当社が運営するサービス及び関連するサービス"},
                    {word: "（2）本コンテンツ", meaning: "本サービス上で提供される文字、音、静止画、動画、ソフトウェアプログラム、コード等の総称（投稿情報を含む）"},
                    {word: "（3）利用者", meaning: "本サービスを利用する全ての方"},
                    {word: "（4）登録ユーザー", meaning: "本サービスの利用者登録が完了した方"},
                    {word: "（5）ＩＤ", meaning: "本サービスの利用のために登録ユーザーが固有に持つ文字列"},
                    {word: "（6）パスワード", meaning: "ＩＤに対応して登録ユーザーが固有に設定する暗号"},
                    {word: "（7）投稿", meaning: "登録ユーザーが文章、文字列、画像、コメント等を掲載する行為"},
                    {word: "（8）投稿情報", meaning: "登録ユーザーが投稿等により掲載した文章、文字列、画像、コメント等の情報の総称"},
                    {word: "（9）個人情報", meaning: "住所、氏名、職業、電話番号等個人を特定することのできる情報の総称"},
                    {word: "（10）登録情報", meaning: "登録ユーザーが本サイトにて登録した情報の総称（投稿情報は除く）"},
                    {
                        word: "（11）知的財産",
                        meaning: "発明、考案、植物の新品種、意匠、著作物その他の人間の創造的活動により生み出されるもの（発見または解明がされた自然の法則または現象であって、産業上の利用可能性があるものを含む）、商標、商号その他事業活動に用いられる商品または役務を表示するもの及び営業秘密その他の事業活動に有用な技術上または営業上の情報"
                    },
                    {
                        word: "（12）知的財産権",
                        meaning: "特許権、実用新案権、育成者権、意匠権、著作権、商標権その他の知的財産に関して法令により定められた権利または法律上保護される利益に係る権利"
                    },
                    {word: "（13）ショッピング", meaning: "本サイト内で当社または他の事業者が提供する商品をユーザーが購入すること"},
                    {word: "（14）購入者", meaning: "本サービスにて商品を購入する利用者をいいます。"},
                ]
            }
        }
    }
</script>

<style scoped>

</style>
