## はじめに

これは[ヒホ](https://twitter.com/hiho_karuta)が開発したテキスト音声合成ソフトウェア「VOICEVOX」の使い方を紹介するドキュメントです。

最初に、インストール（もしくは Zip ファイルを解凍）したディレクトリの中にある README.txt をご確認ください。

[使い方を軽めに紹介した動画](https://youtu.be/4yVpklclxwU)もあるので、よかったらご覧ください。

## 利用規約

ソフトウェア内の「ヘルプ」から、ソフトウェアの利用規約と、音声ライブラリの利用規約をご確認ください。

## 起動方法

起動しようとすると「Windows によって PC が保護されました」というダイアログが表示されるかもしれません。その際は「詳細情報」をクリックし、「実行」を選んでください。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image14.png" style="max-height: 16rem" alt="「Windows によって PC が保護されました」というダイアログ" /> → <img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image15.png" style="max-height: 16rem" alt="「詳細情報」をクリックする" />

## 音声合成エンジンの起動

最初に音声合成エンジンが起動します。メモリが 3GB 以上の NVIDIA 製 GPU をお持ちの方は、音声の生成がずっと速い GPU モードを快適にご利用いただけます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image4.png" style="max-height: 8rem" alt="音声合成エンジンが起動している様子" />

## 音声の生成

キャラクターアイコンの右にある空白をクリックしてテキストを入力してみてください。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image19.png" style="max-height: 12rem" alt="キャラクターアイコンの右にある空白" />

エンターボタンを押して文章を確定すると、画面の下の方に読みとアクセントが表示されます。（１回目は反映まで数秒ほど時間がかかることがあります。）

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image6.png" style="max-height: 14rem" alt="読みとアクセント" />

再生ボタンを押すと音声が生成され、音声が再生されます。

## 文章の追加・削除

右下の＋ボタンを押すとテキスト欄が増え、複数の文章を並べることができます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image10.png" style="max-height: 14rem" alt="右下の＋ボタン" />

## キャラクターの変更

テキスト入力欄の左にあるアイコンをクリックすると、テキストを読み上げてくれるキャラクターを変更することができます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image7.png" style="max-height: 12rem" alt="キャラクター" />

## 単語の接続変更

意図しない箇所で単語が分離していた場合や、意図しない形で結合してしまっている場合は、アクセント項目で文字の間をクリックすることで修正できます。

例えば「ディープラーニング」がこのように分かれてしまった場合は、

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image9.png" style="max-height: 16rem" alt="ディープラーニングがディープとラーニングに分かれている" />

２つの隙間をクリックすると

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image3.png" style="max-height: 8rem" alt="ディープとラーニングの隙間" />

このように１語にまとめることができます

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image8.png" style="max-height: 7rem" alt="隙間が埋まった様子" />

逆に切り離したい場合は、文字の間をクリックして切り離すことができます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image13.png" style="max-height: 8rem" alt="文字が分かれた様子" />

## アクセントの変更

音声の抑揚が意図しないものだった場合に、抑揚を変える方法が２つあります。まずはアクセント箇所を変えてみることをおすすめします。

アクセント箇所を変えるには、読みの上にあるバーを左右に動かします。
例えば「ディープラーニング」を「↑ ディープラ ↓ アニング」と読んでほしい場合は、「ラ」の位置まで丸をスライドします。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image8.png" style="max-height: 8rem" alt="ディープラーニング" /> → <img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image1.png" style="max-height: 8rem" alt="↑ ディープラ ↓ アニング" />

## イントネーションの変更

アクセントを変更してもうまく行かなかったときや、抑揚をより拘りたいときに、文字ごとの音の高さ（イントネーション）を直接変更することができます。

「イントネーション」をクリックして現れる縦線のバーを上下させることで抑揚を表現できます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image2.png" style="max-height: 8rem" alt="「イントネーション」をクリックして現れる縦線のバー" />

イントネーション調整スペースを縦に広くすることで、より細かく抑揚を調整することもできます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image18.png" style="max-height: 14rem" alt="イントネーション調整スペースを縦に広くする" />

マウスホイールで調整することもできます。Ctrl キーを押しながらマウスホイールを使うと更に細かく調整できます。

また、「キ」や「ツ」や「ス」などが無声化されている場合、バーが灰色になっています。イントネーション欄のテキストをクリックすることで無声化を解くことができます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image5.png" style="max-height: 10rem" alt="「キ」や「ツ」や「ス」などが無声化されている様子" /> → <img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image12.png" style="max-height: 10rem" alt="無声化が解除された様子" />

無声化できるものはイ行とウ行だけです。

## 読みの修正

読みが思っているものと違う場合は、アクセント欄で読みをクリックすることで後から修正することもできます。テキスト欄と同様に、ひらがなや句読点、漢字も入力できます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image20.png" style="max-height: 12rem" alt="アクセント欄で読みをクリックしている様子" />

## スタイルの変更

キャラクターによっては複数のスタイル（喋り方）を変えることができます。キャラクターの変更と同様に、テキスト欄左のアイコンから選択できます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image21.png" style="max-height: 12rem" alt="テキスト欄左のアイコン" />

キャラクターを選択したときに適用されるスタイルは、設定の「デフォルトスタイル」で変更できます。

## 音の長さの変更

文字ごとに、音の長さを変えることが可能です。語尾を少し伸ばしたい、無音の長さを調整したいときなどに便利です。

「長さ」をクリックして現れる縦線のバーを上げるとその音を長く、下げると短くできます。
右のバーが母音、左のバーが子音に対応しています。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image22.png" style="max-height: 12rem" alt="「長さ」をクリックして現れる縦線のバー" />

## 音声ファイル・テキストファイルの書き出し

書き出しボタンを押すと、全テキスト欄の音声が WAV ファイルとして書き出されます。
ファイル保存時、ファイル名は[何行目]\_[キャラ名]\_[テキスト冒頭].wav として保存されます。テキストファイルも同じファイル名.txt で保存されます。

## テキストファイルの読み込み

読み込みボタンを押すとテキストファイルを読み込めます。テキストは改行または半角コンマ（,）で区切ることで分割できます。また、キャラクター名だけで区切ることで、そのキャラクターとして読み込むことができます。

例えばこのようなテキストを読み込むと、

```txt
四国めたん,おはようございます,こんにちは
ずんだもん,こんばんは
四国めたん,さようなら
```

このように読み込まれます。

<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image17.png" style="max-height: 12rem" alt="読み込まれた様子" />

## プロジェクトファイルの保存・読み込み

入力したテキストやキャラクター、アクセント修正やイントネーションの調整結果は、プロジェクトファイルとして保存し、ソフトウェアを起動し直した後で読み込むことができます。プロジェクトファイルの拡張子は`.vvproj`です。

## ショートカットキー

「設定」の「ショートカットキー」で変更することができます。

- 上下キー
  - 上下のテキスト欄に移動
- Space
  - 音声を再生
- Shift + Enter
  - テキスト欄を追加
- Shift + Delete
  - テキスト欄を消去
- Ctrl + S
  - プロジェクトの保存
- Ctrl + E
  - 音声を書き出し
- Ctrl + Z
  - 元に戻す
- Ctrl + Y
  - やり直す
- Esc
  - テキスト欄からカーソルを外す
- 1
  - アクセント欄を表示
- 2
  - イントネーション欄を表示
- 3
  - 長さ欄を表示
- スライダーの上でマウスホイール
  - スライダーの値を変更します（スライダー →<img src="https://raw.githubusercontent.com/VOICEVOX/voicevox/0.9.1/public/res/image16.png" style="max-height: 1rem" alt="スライダーの画像" />）

## 設定画面

右上の歯車マークから設定画面を表示できます。

### エンジン

エンジンの起動モードの起動モードを変更できます。
GPU モードを利用するには、3GB 以上のメモリがある NVIDIA 製 GPU が必要です。

### 保存

#### 文字コード

読み込み・書き込み用の文字コードを選択できます。

#### 書き出し先を固定

音声ファイルを書き出すディレクトリを固定し、毎回ディレクトリを選択しなくても同じディレクトリに書き出し続けるようにします。

#### 上書き防止

同じファイル名のファイルがあった場合に連番として保存します。

## その他

右上のピンボタンでウィンドウを最前面に固定できます。

## ヘルプ

利用規約などを確認することができます。

## アンインストール方法

インストーラー版でインストールした場合、インストールしたディレクトリの中にある Uninstall VOICEVOX.exe を実行してください。  
Zip ファイルを解凍した場合、ダウンロードした ZIP ファイルと、展開したディレクトリを消去すればアンインストール完了です。

## よくあるご質問

[Q&A](https://voicevox.hiroshiba.jp/qa) をご参照ください。

## ご感想・ご要望・バグ報告など

ご感想・ご要望は、ぜひ Twitter にてハッシュタグ `#VOICEVOX` を付けてツイートしてください。開発の励みになります。

うまく動かない場合や不具合を見つけられた方は、Twitter にて不具合をハッシュタグ `#VOICEVOX` を付けてツイートしていただくか、VOICEVOX 公式（[@voicevox_pj](https://twitter.com/voicevox_pj)）までご報告ください。

その他、 Q&A に掲載されていないご質問があれば VOICEVOX 公式（[@voicevox_pj](https://twitter.com/voicevox_pj)）にお問い合わせください。
