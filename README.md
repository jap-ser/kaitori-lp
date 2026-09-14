# 不動産買取LP（固定資産税訴求）｜有限会社ジャパンサービス

Meta広告「来年の固定資産税、払いますか？」のリンク先ランディングページ。GitHub Pagesで公開する。

- `index.html` … LP本体（画像はすべて埋め込み済み。この1ファイルだけで動く）
- `.nojekyll` … GitHub PagesのJekyll処理を無効化（そのまま置いておく）
- ローカル確認: `.claude/launch.json` の `kaitori-lp`（http://localhost:8766）

## 運用で毎月さわる場所（index.html の先頭付近）

```js
window.LP_CONFIG = {
  WAKU: 3,   // 今月の買取枠 残り件数（実数に合わせて毎月更新。仮置きのまま公開しない）
};
```

- 「○月」「年内まであと○日」「来年」は自動計算なので手作業不要
- 電話番号 076-267-8552 / LINE https://lin.ee/Fdtwg64 は本文中に直書き
- 電話ボタンは押すと必ず番号シート（発信・コピー・LINE）が出る。スマホでは同時に発信画面も開く
- 査定フォームの送信先（`FORM_ENDPOINT`）は未設定。空のままだと入力内容をコピーしてLINEへ誘導する動きになる

## 更新のしかた

index.html を編集 → commit → push で数分後に公開反映
