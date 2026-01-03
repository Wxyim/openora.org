---
title: "标题最大60个字符码标题最大60个字符码标题最大60个字符码标题最大60个字符码标题最大60个字符码标题最大60个字符1"
description: "This post describes the process of adding webmentions to your own site"
publishDate: "11 Oct 2023"
tags: ["webmentions", "astro", "social"]
updatedDate: 6 December 2024
draft: true
---

## TLDR

1. Add a link on your homepage to either your GitHub profile and/or email address as per [IndieLogin's](https://indielogin.com/setup) instructions. You _could_ do this via `src/components/SocialList.astro`, just be sure to include `isWebmention` to the relevant link if doing so.
2. Create an account @ [Webmention.io](https://webmention.io/) by entering your website's address.
3. Add the link feed and api key to a `.env` file with the key `WEBMENTION_URL` and `WEBMENTION_API_KEY` respectively, you could rename `.env.example` found in this template. You can also add the optional `WEBMENTION_PINGBACK` link here too.
4. Go to [brid.gy](https://brid.gy/) and sign-in to each social account[s] you wish to link.
5. Publish and build your website, remember to add the api key, and it should now be ready to receive webmentions!

## 什么是 webmentions

Put simply, it's a way to show users who like, comment, repost and more, on various pages on your website via social media.

This theme displays the number of likes, mentions and replies each blog post receives. There are a couple of more webmentions that I haven't included, like reposts, which are currently filtered out, but shouldn't be too difficult to include.

## Steps to add it to your own site

Your going to have to create a couple of accounts to get things up-and-running. But, the first thing you need to ensure is that your social links are correct.

### Add link(s) to your profile(s)

Firstly, you need to add a link on your site to prove ownership. If you have a look at [IndieLogin's](https://indielogin.com/setup) instructions, it gives you 2 options, either an email address and/or GitHub account. I've created the component `src/components/SocialList.astro` where you can add your details into the `socialLinks` array, just include the `isWebmention` property to the relevant link which will add the `rel="me authn"` attribute. Whichever way you do it, make sure you have a link in your markup as per IndieLogin's [instructions](https://indielogin.com/setup)

```html
<a href="https://github.com/your-username" rel="me">GitHub 账号 字体测试时  ../。？/?一条狡猾的狐狸越过了那只慵懒的狗</a>
```

### Sign up to Webmention.io

Next, head over to [Webmention.io](https://webmention.io/) and create an account by signing in with your domain name, e.g. `https://astro-cactus.chriswilliams.dev/`. Please note that .app TLDs don't function correctly. Once in, it will give you a couple of links for your domain to accept webmentions. Make a note of these and create a `.env` file (this template include an example `.env.example` which you could rename). Add the link feed and api key with the key/values of `WEBMENTION_URL` and `WEBMENTION_API_KEY` respectively, and the optional `WEBMENTION_PINGBACK` url if required. Please try not to publish this to a repository!

:::note
You don't have to include the pingback link. Maybe coincidentally, but after adding it I started to receive a higher frequency of spam in my mailbox, informing me that my website could be better. TBH they're not wrong. I've now removed it, but it's up to you.
:::

### Sign up to Brid.gy

You're now going to have to use [brid.gy](https://brid.gy/). As the name suggests, it links your website to your social media accounts. For every account you want to set up (e.g. Mastodon), click on the relevant button and connect each account you want brid.gy to search. Just to note again, brid.gy currently has an issue with .app TLDs.

## Testing everything works

With everything set, it's now time to build and publish your website. **REMEMBER** to set your environment variables `WEBMENTION_API_KEY` & `WEBMENTION_URL` with your host.

You can check to see if everything is working by sending a test webmention via [webmentions.rocks](https://webmention.rocks/receive/1). Log in with your domain, enter the auth code, and then the url of the page you want to test. For example, to test this page I would add `https://astro-cactus.chriswilliams.dev/posts/webmentions/`. To view it on your website, rebuild or (re)start dev mode locally, and you should see the result at the bottom of your page.

You can also view any test mentions in the browser via their [api](https://github.com/aaronpk/webmention.io#api).

## Things to add, things to consider

- At the moment, fresh webmentions are only fetched on a rebuild or restarting dev mode, which obviously means if you don't update your site very often you wont get a lot of new content. It should be quite trivial to add a cron job to run the `getAndCacheWebmentions()` function in `src/utils/webmentions.ts` and populate your blog with new content. This is probably what I'll add next as a github action.

- I have seen some mentions have duplicates. Unfortunately, they're quite difficult to filter out as they have different id's.

- I'm not a huge fan of the little external link icon for linking to comments/replies. It's not particularly great on mobile due to its size, and will likely change it in the future.

## Acknowledgements

Many thanks to [Kieran McGuire](https://github.com/chrismwilliams/astro-theme-cactus/issues/107#issue-1863931105) for sharing this with me, and the helpful posts. I'd never heard of webmentions before, and now with this update hopefully others will be able to make use of them. Additionally, articles and examples from [kld](https://kld.dev/adding-webmentions/) and [ryanmulligan.dev](https://ryanmulligan.dev/blog/) really helped in getting this set up and integrated, both a great resource if you're looking for more information!

本部建物がある。一階には食堂と大きな浴場、二階には講堂といくつかの集会室、それから何に使うのかは知らないけれど貴賓室まである。本部建物のとなりには三つめの寮棟がある。これも三階建てだ。中庭は広く、緑の芝生の中ではスプリンクラーが太陽の光を反射させながらぐるぐると回っている。本部建物の裏手には野球とサッカーの兼用グラウンドとテニス？コートが六面ある。至れり尽せりだ。
　　この寮の唯一の問題点はその根本的なうさん臭さにあった。寮はあるきわめて右翼的な人物を中心とする正体不明の財団法人によって運営されており、その運営方針は――もちろん僕の目から見ればということだが――かなり奇妙に歪んだものだった。入寮案内のパンフレットと寮生規則を読めばそのだいたいのところはわかる。「教育の根幹を窮め国家にとって有為な人材の育成につとめる」、これがこの寮創設の精神であり、そしてその精神に賛同した多くの財界人が私財を投じ……というのが表向きの顔なのだが、その裏のことは例によって曖昧模糊としている。正確なところは誰にもわからない。ただの税金対策だと言うものもいるし、売名行為だと言うものもいるし、寮設立という名目でこの一等地を詐欺同然のやりくちで手に入れたんだと言うものもいる。いや、もっともっと深い読みがあるんだと言うものもいる。彼の説によればこの寮の出身者で政財界に地下の閥を作ろうというのが設立者の目的なのだということであった。たしかに寮には寮生の中のトップ？エリートをあつめた特権的なクラブのようなものがあって、僕もくわしいことはよく知らないけれど、月に何度かその設立者をまじえて研究会のようなものを開いており、そのクラブに入っている限り就職の心配はないということであった。そんな説のいったいどれが正しくてどれが間違っているのか僕には判断できないが、それらの説は「とにかくここはうさん臭いんだ」という点で共通していた。
　　いずれにせよ一九六八年の春から七〇年の春までの二年間を僕はこのうさん臭い寮で過した。どうしてそんなうさん臭いところに二年もいたのだと訊かれても答えようがない。日常生活というレベルから見れば右翼だろうが左翼だろうが、偽善だろうが偽悪だろうが、それほどたいした違いはないのだ。
　　寮の一日は荘厳な国旗掲揚とともに始まる。もちろん国歌も流れるし　スポーツ？ニュースからマーチが切り離せないように、国旗掲揚から国歌は切り離せない。国旗掲揚台は中庭のまん中にあってどの寮棟の窓からも見えるようになっている。
　　国旗を掲揚するのは東棟（僕の入っている寮だ）の寮長の役目だった。背が高くて目つきの鋭い六十前後の男だ。いかにも硬そうな髪にいくらか白髪がまじり、日焼けした首筋に長い傷あとがある。この人物は陸軍中野学校の出身という話だったが、これも真偽のほどはわからない。そのとなりにはこの国旗掲揚を手伝う助手の如き立場の学生が控えている。この学生のことは誰もよく知らない。丸刈りで、いつも学生服を着ている。名前も知らないし、どの部屋に住んでいるのかもわからない。食堂でも風呂でも一度も顔をあわせたことがない。本当に学生なのかどうかさえわからない。まあしかし学生服を着ているからにはやはり学生なのだろう。そうとしか考えようがない。そして中野学校氏とは逆に背が低く、小太りで色が白い。この不気味きわまりない二人組が毎朝六時に寮の中庭に日の丸をあげるわけだ。
　　僕は寮に入った当初、もの珍しさからわざわざ六時に起きてよくこの愛国的儀式を見物したものである。朝の六時、ラジオの時報が鳴るのと殆んど同時に二人は中庭に姿を見せる。学生服はもちろん、学生服に黒の皮靴、中野学校はジャンパーに白の運動靴という格好である。学生服は桐の薄い箱を持っている。中野学校はソニーのポータブル？テープレコーダーを下げている。中野学校がテープレコーダーを掲揚台の足もとに置く。学生服が桐の箱をあける。箱の中にはきちんと折り畳まれた国旗が入っている。学生服が中野学校にうやうやしく旗を差し出す。中野学校がローブに旗をつける。学生服がテープレコーダーのスイッチを押す。
　　君が代。
　　そして旗がするするとポールを上っていく。
　　「さざれ石のお――」というあたりで旗はポールのまん中あたり、「まあで――」というところで頂上にのぼりつめる。そして二人は背筋をしゃんとのばして（気をつけ）の姿勢をとり、国旗をまっすぐに見あげる。空が晴れてうまく風が吹いていれば、これはなかなかの光景である。
　　夕方の国旗降下も儀式としてはだいたい同じような様式でとりおこなわれる。ただし順序は朝とはまったく逆になる。旗はするすると降り、桐の箱の中に収まる。夜には国旗は翻らない。
　　どうして夜のあいだ国旗が降ろされてしまうのか、僕にはその理由がわからなかった。夜のあいだだってちゃんと国家は存続しているし、働いている人だって沢山いる。線路工夫やタクシーの運転手やバーのホステスや夜勤の消防士やビルの夜警や、そんな夜に働く人々が国家の庇護を受けることができないというのは、どうも不公平であるような気がした。でもそんなのは本当はそれほどたいしたことではないのかもしれない。誰もたぶんそんなことは気にもとめないのだろう。気にするのは僕くらいのものなのだろう。それに僕にしたところで何かの折りにふとそう思っただけで、それを深く追求してみようなんていう気はさらさらなかったのだ。
　　寮の部屋割は原則として一、二年生が二人部屋、三、四年生が一人部屋ということになっていた。二人部屋は六畳間をもう少し細長くしたくらいの広さで、つきあたりの壁にアルミ枠の窓がついていて、窓の前に背中あわせに勉強できるように机と椅子がセットされている。入口の左手に鉄製の二段ベッドがある。家具はどれも極端なくらい簡潔でがっしりとしたものだった。机とベッドの他にはロッカーがふたつ、小さなコーヒー？テーブルがひとつ、それに作りつけの棚があった。どう好意的に見ても詩的な空間とは言えなかった。大抵の部屋の棚にはトランジスタ？ラジオとヘア？ドライヤーと電気ポットと電熱器とインスタント？コーヒーとティー？バッグと角砂糖とインスタント？ラーメンを作るための鍋と簡単な食器がいくつか並んでいる。しっくいの壁には「平凡パンチ」のビンナップか、どこかからはがしてきたポルノ映画のポスターが貼ってある。中には冗談で豚の交尾の写真を貼っているものもいたが、そういうのは例外中の例外で、殆んど部屋の壁に貼ってあるのは裸の女か若い女性歌手か女優の写真だった。机の上の本立てには教科書や辞書や小説なんかが並んでいた。

【韩语散文】허상에 마음을 두었다(中韩对照·长篇)

　　마음이 괴로울 때가 있다.그럴 때면 나는 다른 누군가에게 의지하기보다 혼자 극복하려고 노력하는 편이었다.연인이나 친구 혹은 술에 의지하지 않고 오로지 나 스스로 굳게 서려고 애썼다. 아무리 가까운 사이라고 해도 매일 앓는 소리만 한다면 그들도 나를 힘겨워할 테니까 .그래서 밝은 모습만 보여 주고 즐거운 얘기만 나누려 애썼다. 누군가 나에게 “힘든 일은 없니” 라고 물을 때면, 나는 늘 이렇게 대답했다.

　　我也会有痛苦的时候。每当这时，比起依靠别人，我是那种更想要自己克服的人。不依靠恋人、朋友、酒，而是选择努力地一个人坚强地挺过来。因为无论关系多么亲密，如果每天都对他们“痛苦呻吟”，那么他们也会难以承受。所以，我一直努力地只去展现自己开朗的一面，只分享着一些愉快的事情。当有人问我“就没有什么糟心的事吗?”，我一直这样作答。

　　“네，저는 괜찮습니다.”

　　“嗯，我没事。”

　　“괜찮다”는 말은 아주 좋은 포장지였다. 아무리 어려운 상황에 놓여 있어도 내가 괜찮다고 말하면 사람들은 더 이상 묻지 않았다.무엇이 괜찮은지, 어떻게 괜찮은지, 왜 괜찮은지 궁금해하지 않았다. 괜찮으면 괜찮은가 보다 하며 넘어갔다. 어쩌면 그게 내가 바라던 바였는지도 모르겠다. 괜히 무거운 대화 주제를 꺼내어 분위기를 망치고 싶지 않았으니까. 그래서 어느 자리에서건 나 늘 웃었다. 텅 빈 눈과 텅 빈 마음으로.

　　“我没事”这句话真的是一层非常好用的包装纸。无论我身处怎样的情况之下，只要我说了“我没事”，别人便不再追问。也不会好奇我什么“没事”了，怎样“没事”了，为什么“没事”了。我说“没事了”，别人就觉得真的就是“没事了”吧，也就这样一带而过了。也许这就是我所想要的吧。因为我不想平白无故地抛出沉重的话题，也不想破坏气氛。所以，无论身处什么位置(场合)，我一直都是面带微笑的。可是却两眼空空，心也空空。

　　하지만 집에 돌아와서는 사정이 달랐다. 힘든 마음을 오롯이 혼자 쏟아 내고 감당하려 했다.엉엉 울거나 하루 종일 게임을 하거나 내내 잠만 자거나.그날그날 힘들었던 일들을 오롯이 혼자서 감당하기 위해 마음을 다잡았다 .

　　但是回到家后，情况却变了。我独自宣泄着疲惫的心。或独自痛哭流涕，或整日与游戏为伍，或一直沉迷睡觉。我倾尽了全身的气力，想要静静地一个人承受每一天发生的糟心事。

　　처음부터 혼자는 아니었다.

　　我并非一开始就是“一个人”(的状态)。

　　언제부터인가 나 스스로 사람들에게 거리를 두려 했던 것 같다.한때는 나는 누군가에게 마음을 털어 놓거나 잠시 어깨에 기대어 보기도 했다.하지만 나에게 힘든 마음을 가볍게 여기는 사람들, 내 아픔을 함부로 떠들던 사람들, 그리고 어렵게 꺼냈던 내 아픈 이야기들이 여러 사람의 입에 오르내리며 하찮게 떠돌던 경험들이 내 마음의 문을 닫게 만들었다. 아마도 그때부터였던 것 같다. 혼자가 편하겠다는 생각이 들었던 순간이...

　　也不知从何时起，我开始有意和别人保持距离了。其实之前，我也尝试过向别人倾诉，也曾依靠过别人的肩膀。但是，那些不把我的痛苦心情当回事儿的人，那些肆意议论我痛苦的人，还有，这些人把我难以言表的痛苦之事不以为意地传得众人皆知，这些经历让我从此心门紧闭。也许就是从那时起。那个瞬间，我产生了还是一个人会更舒服的想法吧...

　　처음부터 혼자가 되고 싶지는 않았다. 하지만 뻔한 사람들에게 상처받느니 조금 쓸쓸한 편이 더 낫다고 되새겼다. 하지만 꿈속에서 얼굴조차 보이지 않는 존재에게 그리도 편하게 안겨 있는 내 모습을 보고 알았다.

　　并非从一开始我就想一个人的。但与其被那些不提也罢的人伤害，我反复思索后还是觉得倒不如一个人来得清净又舒服。可是，在我的梦里，当我看到自己被连脸都看不到的人拥抱的样子后，我便醒悟了。

　　누군가에게 기대고 싶은 마음, 의지하고 싶은 마음, 아픔을 나누고 싶은 마음이 내 진심이었다는 것을. 하지만 그럴 수 없어서 애써 진심을 모른 척 감추어 왔다는 것을. 내 진심을 마주하는 게 괴로웠을 테니까.

　　想要有所依靠，想要有所依赖，想要有人分担我的痛楚，这些才是我“真实的心境”。但是因为我做不到，所以我努力地假装不知晓自己这样的“真实的心境”，我一直费尽心思地把自己“藏”了起来。因为面对这份“真实的心境”会使我苦不堪言。

　　혼자가 편하다고 말했지만

　　어쩌면 나는 누구보다

　　혼자가 되는 게 두려웠는지도 모르겠다