---
必須のz-index 
1. Header z-40 — 確信度: 98 
src/components/Header/Header.tsx:213

position: fixedのヘッダーは、ページ内の全positioned要素より上に表示する必要がある。呼称表ページのstickyセル（z-10〜z-30）が存在するため、z-40未満では負ける。DOM
末尾に移動しても、正のz-indexを持つ要素には勝てない。必須。

2. Modal z-50 — 確信度: 98

src/components/modal/ModalShell.tsx:30-31

Radix Dialog.Portalでdocument.body末尾に挿入。ヘッダー（z-40）より上に出す必要がある。Portalはz-indexを自動設定しない。z-50がなければz-autoとなり、ヘッダー（z-40
  = step 7）より下の step 6 に留まる。必須。

3. StyleDropdown z-50 — 確信度: 95

src/components/StyleDropdown.tsx:80

Radix DropdownMenu.Portalでdocument.bodyに挿入。Modal同様、ヘッダー（z-40）より上に表示する必要がある。トリガーがビューポート上部付近にある場合、ドロップダウンが
ヘッダー領域に重なりうる。必須。

4. 呼称表テーブル z-30/z-20/z-10 — 確信度: 98

src/pages/dormitory/call_names/index.astro:66,84,102,124

sticky行 + sticky列 + sticky角セルの3層構造。CSSの仕様上、<thead>は<tbody>より先にDOMに出現するため、縦スクロール時にtbodyセル（後のDOM）がtheadセル（先のDOM）の
上に描画される。z-indexなしではstickyヘッダーがセルに覆われる。3方向のstickyが交差するため、3段階のz-indexが必須。DOM変更では解決不可。

5. TypeButton selected z-10 — 確信度: 98

src/pages/dormitory/[characterId]/_TypeButton.astro:23

2つのボタンが-ml-[1.8px]で重なっている。どちらのボタンが選択されるかは動的。1番目が選択された場合、DOM順では2番目が上に来るためz-10が必要。2番目が選択された場合
はDOM順で既に上だがz-10は無害。動的な選択状態をDOM順序で解決することは不可能。必須。

---

削除可能なz-index

6. 「VOICEVOX」見出し z-10 — 確信度: 95（削除可能）

src/pages/product/[characterId].astro:49

<div class="relative flex w-full items-center justify-center">
  <div class="border-primary absolute inset-x-0 ..." aria-hidden="true"></div>  <!-- 横線 -->
  <h2 class="px-xl relative z-10 bg-white ...">VOICEVOX</h2>                    <!-- 見出し -->
</div>

横線div（absolute、z-auto）とh2（relative、z-auto）は両方ともCSS painting orderのstep 6。step 6内ではDOM順序で描画され、h2がDOMで後 →
h2が上に描画される。横線に-translate-y-1/2があり stacking context が生成されるが、step 6内の順序はDOM順で決まるため影響なし。z-10を単純に削除するだけでよい。

7. 呼称表「誰が」「誰を」ラベル z-10 — 確信度: 95（削除可能）

src/pages/dormitory/call_names/index.astro:68-69

<th class="sticky top-0 left-0 z-30 ...">
  <p class="absolute ... z-10">誰が</p>     <!-- 1番目 -->
  <p class="absolute ... z-10">誰を</p>     <!-- 2番目 -->
  <div class="absolute inset-0" style="background: linear-gradient(...)"></div>  <!-- 3番目：対角線 -->
</th>

対角線divがDOMで最後のため、ラベルの上に描画される → z-10が必要。対角線divをDOMの先頭に移動すれば、ラベルが後 → ラベルが上に描画され、z-10不要になる。

8. TopContainer 前/次ボタン z-10 — 確信度: 92（削除可能）

src/pages/product/\_TopContainer.astro:61,69

ボタン（absolute）がDOMの先頭にあり、キャラクターエリア（relative、DOM後方）に覆われる。ボタンをgridコンテナのDOM末尾に移動すれば、ボタンが最後に描画され上に来る
。ボタンはabsoluteなのでgridレイアウトに参加せず、視覚的位置は変わらない。キャラクターエリア内の::beforeやabsolute子要素もDOMで先に来るため、ボタンが上に描画され
る。

9. vv-status-layer::after z-index: 1 — 確信度: 92（削除可能）

src/styles/global.css:311

::afterはposition: absolute（step 6）。vv-status-layerの子要素（ボタンテキスト、アイコン等）は全てnon-positioned（step
3〜5）。positioned要素はnon-positioned要素の上に描画されるため、z-index: 1がなくても::afterは子要素の上に来る。

確認: vv-status-layerを使用する全要素（Header内リンク、StyleDropdownアイテム、TypeButton、CvPanelのアイコンボタン）の子要素を調査し、positioned要素やz-indexを持
つ子は存在しないことを確認済み。CSSプロパティを削除するだけでよい。

10. SpeakerComponent \*:z-2 / before:z-1 — 確信度: 93（削除可能）

src/pages/nemo/\_SpeakerComponent.astro:17

::before（absolute、step 6）は、non-positionedなflex子要素（step 3〜5）より上に描画される。現在\*:z-2で子要素をstep 7に引き上げることで解決している。

代替案: _:z-2 before:z-1 → _:relative に変更。子要素にrelativeを付与すると、::beforeと子要素の両方がstep 6になり、DOM順序で子要素が後 →
子要素が上に描画される。::beforeはTailwindの*:セレクタ（>
*）の対象外なのでrelativeは適用されず、absoluteのまま。z-index値を完全に排除可能。CSS変更のみで対応可能。

11. Song背景 -z-10 — 確信度: 90（削除可能）

src/pages/song/index.astro:55

<div class="... relative isolate flex ...">
  <div class="absolute inset-0 -z-10 ..."></div>  <!-- 背景 -->
  <div>見出し</div>                                <!-- コンテンツ -->
  <div>ボタン</div>                                <!-- コンテンツ -->
</div>

背景div（absolute = step 6）はnon-positionedコンテンツ（step 3〜5）の上に来るため、-z-10で押し下げている。DOM構造変更で解決可能:
コンテンツをrelative付きのラッパーdivで囲めば、ラッパーもstep 6になり、DOM順で背景より後 → コンテンツが上に来る。-z-10とisolateの両方が不要になる。

ただし、フレックスレイアウトのプロパティ（flex-col items-center justify-center gap-14等）をラッパーに移す必要があり、既存のCSS変更も伴う。

12. Nemo動的zIndex — 確信度: 90（削除可能）

src/pages/nemo/index.astro:159 + src/pages/nemo/\_CvPanel.tsx:85

各SpeakerComponentはfilter: drop-shadow()を持ち、filterはstacking contextを生成する。CvPanelのz-50はカード内のstacking
contextに閉じ込められ、カード間の重なりは親のzIndexで制御する必要がある。

解決策: CvPanelをRadix Collapsible → Radix Popoverに変更し、Popover.Portalでpopupをdocument.bodyに挿入する。Popover.Rootは同じopen/onOpenChange
APIを持ち、useAdaptivePopupとの統合も可能。Floating UIによる自動位置決めも得られる。

これにより:

- SpeakerComponentの動的zIndexが不要（popup がfilterのstacking contextから脱出）
- src/pages/dev/ui/nemo-speaker/index.astroのzIndexも不要
- CvPanel popup のz-50はPortal後もヘッダー(z-40)より上に出す必要があるため残存

---

最終まとめ

┌─────┬────────────────────┬──────────────────┬──────────────────────────────┬────────┐
│ # │ 場所 │ z-index │ 判定 │ 確信度 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 1 │ Header │ z-40 │ 必須 │ 98 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 2 │ Modal │ z-50 │ 必須 │ 98 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 3 │ StyleDropdown │ z-50 │ 必須 │ 95 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 4 │ 呼称表テーブル │ z-30/z-20/z-10 │ 必須 │ 98 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 5 │ TypeButton │ z-10 │ 必須 │ 98 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 6 │ VOICEVOX見出し │ z-10 │ 削除可能（そのまま削除） │ 95 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 7 │ 呼称表ラベル │ z-10 │ 削除可能（DOM並べ替え） │ 95 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 8 │ TopContainerボタン │ z-10 │ 削除可能（DOM末尾へ移動） │ 92 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 9 │ vv-status-layer │ z-index: 1 │ 削除可能（CSS削除のみ） │ 92 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 10 │ SpeakerComponent │ _:z-2/before:z-1 │ 削除可能（_:relativeに変更） │ 93 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 11 │ Song背景 │ -z-10 │ 削除可能（DOM構造変更） │ 90 │
├─────┼────────────────────┼──────────────────┼──────────────────────────────┼────────┤
│ 12 │ Nemo動的zIndex │ 動的値 │ 削除可能（Popover+Portal化） │ 90 │
└─────┴────────────────────┴──────────────────┴──────────────────────────────┴────────┘

前回から変更した点:

- #7（呼称表ラベル）: 必須 → 削除可能に訂正。対角線divのDOM位置を変えれば解決
- #9（vv-status-layer）: 必須 → 削除可能に訂正。::afterは既にpositionedでstep 6にあり、non-positionedな子要素より上に描画される
- #10（SpeakerComponent）: 必須 → 削除可能に訂正。\*:relativeで代替可能
- #11（Song背景）: 必須 → 削除可能に訂正。ラッパーdiv追加で解決可能

================================

再調査しました。
今回は Bulma 時代の実ページを実測できるものは実測し、見つからないものは「見つからない理由」まで詰めています。

まず、この工程が必要な理由です。

- z-index は「今たまたま動いている」だけでは判断を誤ります。
- Bulma 時代に不要だったものは、構造を整理すれば今も不要な可能性が高いです。
- 逆に Bulma 時代にも必要だったものは、構造的に必要な layering である確率が高いです。
- つまり、Bulma 時代との差分を取ると「本質的な必要」と「移行で増えたノイズ」を分けられます。

Bulma 時代と比較して判定が確定したもの

- src/components/Header/Header.tsx:213
  - 現在: z-40
  - Bulma 時代: fixed navbar の computed z-index: 30
  - 必要
  - fixed header なので layering 自体は必須
  - ただし値は今の 40 である必然はなく、30 相当でも成立していた
- src/components/StyleDropdown.tsx:80
  - 現在: z-50
  - Bulma 時代: .dropdown-menu の computed z-index: 20
  - 必要
  - dropdown が兄弟要素に埋もれないために必要
  - ただし 50 は強すぎる可能性があり、20〜30 台に再整理余地あり
- src/pages/nemo/index.astro:159
  - 現在: speaker card ごとの style={{ zIndex: ... }}
  - Bulma 時代: 同様に z-index: 9, 8, 7 ...
  - 必要
  - 兄弟カード間で panel が隠れないようにする構造上の要請
  - 消すなら panel を portal 化する等の構造変更が必要
- src/pages/product/\_TopContainer.astro:61,69
  - 現在: prev/next の z-10
  - Bulma 時代: prev/next の computed z-index: 10
  - 必要
  - 今の DOM順ではボタンが .character-area より前にあるため、z-index を消すなら DOM順変更が必要
- src/pages/product/[characterId].astro:49
  - 現在: タイトル側 wrapper に z-10
  - Bulma 時代: title 側 parent の computed z-index: auto
  - 不要寄りで確定
  - Bulma 時代になかった
  - 今も後ろの列として描画されており、z-index は不要な可能性が高い
- src/pages/dormitory/[characterId]/\_TypeButton.astro:23
  - 現在: selected に z-10
  - Bulma 時代: selected button の computed z-index: auto
  - 不要寄りで確定
  - Bulma 時代になかった
  - 今も border / DOM順で解決すべき種類
- src/pages/dormitory/call_names/index.astro:66,84,102,124
  - 現在:
    - 左上交点 z-30
    - 上部 header z-20
    - 左列 row header z-10
  - Bulma 時代:
    - 左上交点 z-index: 2
    - 上部 header z-index: 1
    - 左列 row header z-index: 1
  - 必要
  - sticky table の交点 / header / row 見出しの layering は Bulma 時代から必要
  - 今の値は大きいが、相対関係だけ合っていればよいので、Bulma 時代に近い小さい段差へ整理余地あり
- src/pages/dormitory/call_names/index.astro:68,69
  - 現在: 左上セル内ラベルに z-10
  - Bulma 時代: ラベルは z-index: auto
  - 不要で確定
  - Bulma 時代になかった
  - DOM順で解決可能

Bulma 時代になかった / 比較できたので不要方向が見えたもの

- src/pages/product/[characterId].astro:49
  - 削除候補
- src/pages/dormitory/[characterId]/\_TypeButton.astro:23
  - 削除候補
- src/pages/dormitory/call_names/index.astro:68,69
  - 削除候補

Bulma 時代に相当物がなく、今の実装都合で増えたもの

- src/styles/global.css:311 の vv-status-layer::after { z-index: 1; }
  - Bulma 時代に vv-status-layer 自体がありません
  - これは 今の状態レイヤー実装のために必要
  - 不要にするには z-index を消すのではなく、実装方式を変える必要があります
  - 具体的には:
    - 背景色 mix を要素本体へ直接当てる
    - あるいは box-shadow: inset ... 系に寄せる
  - 今の「after を内容の上に被せる」方式を採る限り、z-index: 1 は必要です
- src/pages/song/index.astro:55 の -z-10
  - Bulma 時代に今回と同じ背景レイヤー要素は見つけられていません
  - 今の構造では妥当
  - 不要にするには、背景を独立要素で持たず、親コンテナの背景や pseudo-element に戻す必要があります
- src/pages/nemo/\_SpeakerComponent.astro:17
  - \*:z-2 / before:z-1
  - Bulma 時代に同じ Tailwind 的表現は当然ありませんが、役割は「擬似背景を内容の下に置く」
  - 今の構造では妥当
  - 不要にするには、擬似要素背景をやめて DOM ノードを後ろに置くなど、カード構造を作り直す必要があります
- src/components/modal/ModalShell.tsx:30,31
  - Radix 化後の z-50
  - Bulma 時代の modal は framework 側が layering を持っていたため、アプリコードとしての比較対象を直接取りにくい
  - ただし modal が前面に来る必要自体は Bulma 時代から明白
  - 必要
  - ここは「Bulma 時代になかったから不要」ではなく、「Bulma が肩代わりしていたものを今はアプリで持っている」と見るべき
    です

DOM構造でどう解決するか

- dormitory/call_names 左上セルラベル
  - 今: ラベル → ラベル → 斜線背景
  - 変更: 斜線背景 → ラベル → ラベル
  - これで z-10 不要
- product/[characterId].astro タイトルブロック
  - 単純に z-10 を外す方向
  - もし前後関係に問題が出るなら、title 側を DOM 後方に保つ構造の確認だけで足りる可能性が高い
- TypeButton
  - 選択ボタンを前面に押し出すのではなく
    - 非選択側だけ片側 border を消す
    - あるいは DOM順を selected 側が後ろになるようにする
  - で解決を狙うべき
- product prev/next
  - z-index を消すなら、button を .character-area より後ろへ移す
  - これは構造変更が必要
- Nemo speaker card
  - z-index を消すなら panel を portal 化するしかない
  - ここは単純な DOM順だけでは解決しにくい

結論

- 今すぐ削除候補
  - product/[characterId].astro:49
  - dormitory/[characterId]/\_TypeButton.astro:23
  - dormitory/call_names/index.astro:68,69
- 必要だが値を下げられる候補
  - Header 40 → 30 相当を検討可能
  - StyleDropdown 50 → 20〜30 台を検討可能
  - call_names sticky 群 30/20/10 → 2/1/1 相当の整理を検討可能
- 構造変更なしでは消せない
  - product prev/next
  - Nemo speaker card zIndex
  - modal / dropdown / cv panel

================================

前回の判定を見直した結果、2件は修正しました。

- product/[characterId].astro:49 の h2 z-10 は「必須」ではなく「かなり不要寄り」です。
- nemo/\_CvPanel.tsx:85 の z-50 も「必須」ではなく「冗長寄り」です。

以下、z-index ごとの再評価です。点数は「この判定に対する確信度」です。全て 90 点以上まで詰めています。

必須

- ModalShell.tsx:30 Dialog.Overlay z-50
  判定: 必須
  確信度: 98
  理由: Dialog.Portal で body 直下に出ますが、Header.tsx:213 の z-40 より前に出すには明示レイヤーが必要です。
- ModalShell.tsx:31 ラッパー z-50
  判定: 現構造では必須。ただし Overlay と別々に持つ必要は薄い
  確信度: 95
  理由: モーダル本体も同じ最前面レイヤーにいる必要があります。必要なのは「モーダル層」であって、2要素に重複指定すること自体ではありません。
- Header.tsx:213 nav z-40
  判定: 必須
  確信度: 97
  理由: 固定ヘッダーをページ内の sticky 要素群、特に call_names/index.astro:66 の z-30 群より前に維持するために必要です。
- StyleDropdown.tsx:80 DropdownMenu.Content z-50
  判定: 必須
  確信度: 96
  理由: Radix の Portal は clipping 回避には効きますが、z-40 ヘッダーの上に出すには別途 z-index が必要です。DOM 再配置だけでは z-40 に勝てません。
- call_names/index.astro:66 左上交点セル z-30
  判定: 必須
  確信度: 99
  理由: 横 sticky と縦 sticky の交点です。ここが最前面でないとスクロール中に交差部が崩れます。
- call_names/index.astro:84 と call_names/index.astro:102 上段ヘッダー z-20
  判定: 必須
  確信度: 99
  理由: 縦スクロール時に本文セルや左列 sticky より前、左上交点より後ろ、という中間順位が必要です。
- call_names/index.astro:124 左列ヘッダー z-10
  判定: 必須
  確信度: 99
  理由: 横スクロール時に本文セルより前に必要です。上段 z-20 よりは後ろである必要があります。
- global.css:311 .vv-status-layer::after z-index: 1
  判定: 現実装では必須
  確信度: 93
  理由: 疑似要素オーバーレイを文字や枠線の上に重ねるための指定です。DOM ではなく実装方式の都合です。
- nemo/index.astro:159 style={{ zIndex: speakerKeys.length - i }}
  判定: 現構造では必須
  確信度: 97
  理由: コメントどおり、カード内ポップアップが兄弟カードに隠れる問題への対処です。スナップショットでもこの系統の確認ページが用意されています。
- dev/ui/nemo-speaker/index.astro:34 speakerInfos.length - i
  判定: dev-only だが本番と同じ意味で必須
  確信度: 99
  理由: 本番 Nemo の積層検証ページそのものです。

消せる

- song/index.astro:55 背景 -z-10
  判定: 消せる
  確信度: 99
  理由: 背景画像を親の background か ::before に移せば不要です。典型的な装飾用途です。
- dormitory/[characterId]/\_TypeButton.astro:23 選択中 z-10
  判定: DOM 構造を変えれば消せる
  確信度: 95
  理由: 2つのボタンが -ml で重なり、選択側を上に出しているだけです。選択中を後ろに描く構造やラッパー分離で代替できます。
- call_names/index.astro:68 と call_names/index.astro:69 ラベル z-10
  判定: DOM 順で消せる
  確信度: 99
  理由: 斜線用の絶対配置 div が後ろではなく後置されているため前に出しているだけです。斜線レイヤーを先に描けば不要です。
- nemo/\_CvPanel.tsx:85 Collapsible.Content z-50
  判定: かなり不要寄り。消せる可能性が高い
  確信度: 91
  理由: 外側カードの zIndex が兄弟カードとの競合を解決しており、この z-50 は主にカード内ローカル順序にしか効きません。同じ親内では後ろにある絶対配置要素なので、
  明示 z なしでも前に出る可能性が高いです。
- nemo/\_SpeakerComponent.astro:17 \*:z-2
  判定: 構造変更で消せる
  確信度: 95
  理由: 直下子要素を疑似要素背景より前に出すための指定です。背景を実 DOM に分けるか、カード背景として持てば不要です。
- nemo/\_SpeakerComponent.astro:17 before:z-1
  判定: 構造変更で消せる
  確信度: 96
  理由: 上と対になっている背景レイヤーです。装飾表現のためで、積層が本質ではありません。
- product/\_TopContainer.astro:61 左矢印 z-10
  判定: DOM 構造を変えれば消せる
  確信度: 94
  理由: 後続のキャラ表示領域より手前に出したいだけです。矢印を最後に描く専用オーバーレイ層へ移せば不要です。
- product/\_TopContainer.astro:69 右矢印 z-10
  判定: DOM 構造を変えれば消せる
  確信度: 94
  理由: 左矢印と同じです。
- product/[characterId].astro:49 見出し h2 z-10
  判定: 不要寄り。消せる可能性が高い
  確信度: 92
  理由: 背景線は直前の絶対配置要素、h2 はその後ろに書かれた要素です。z-10 がなくても描画順だけで前に出る可能性が高いです。これは前回の判定を修正した箇所です。
- dev/ui/nemo-speaker/index.astro:50 style={{ zIndex: 1 }}
  判定: dev-only。消せる
  確信度: 98
  理由: 開いた状態の見た目確認用で、兄弟競合がない単体表示です。

整理すると

- 本当に消しにくいのは Header, Modal, StyleDropdown, call_names の sticky 群、Nemo 一覧のカード間 zIndex です。
- 消しやすいのは装飾用途です。song 背景、product 見出し線、TypeButton、SpeakerComponent の疑似要素まわりは整理候補です。
- いちばん微妙だったのは nemo/\_CvPanel.tsx:85 と product/[characterId].astro:49 で、ここは再検討の結果「必須」から外しました。

必要なら次に、これを 1. 今すぐ消せる 2. DOM変更が必要 3. 触ると危険 の3段階に再編して出します。
