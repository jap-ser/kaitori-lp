# 不動産買取LP（固定資産税訴求）｜有限会社ジャパンサービス

Meta広告「来年の固定資産税、払いますか？」のリンク先ランディングページ。GitHub Pagesで公開する。公開URL: https://jap-ser.github.io/kaitori-lp/ （GitHub組織 jap-ser ／ リポジトリ kaitori-lp。相場サイト jap-ser.github.io とは別の箱）

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
- 電話番号 076-267-8552 / LINE https://lin.ee/kzL45s6 は本文中に直書き
- 電話ボタンは押すと必ず番号シート（発信・コピー・LINE）が出る。スマホでは同時に発信画面も開く
- 査定フォームの送信先（`FORM_ENDPOINT`）: Google Apps Script「買取LP 査定フォーム受付」（kota0206h7@gmail.com の script.google.com。コードの控えは `form-endpoint/Code.gs`）。受信内容はスプレッドシート「買取LP 査定依頼」 https://docs.google.com/spreadsheets/d/1PS3D-1z_fws5bAnbsXbpID9yZwprmENi_8ZweDslmyQ/edit に1行ずつ追記され、kota0206h7@gmail.com と jap-ser@outlook.jp にメール通知が届く。空にすると入力内容をコピーしてLINEへ誘導する動きに戻る。Code.gs を直したときは Apps Script 側で「デプロイ → デプロイを管理 → 鉛筆 → 新バージョン」にしないと反映されない
- アクセス計測: GA4 測定ID `G-F6DE8DCGKB`（アナリティクスのアカウント js ／ プロパティ「ジャパンサービス 買取LP」）。イベント tel_click / line_click / cta_click / form_submit / popup_view を送る

## 更新のしかた

index.html を編集 → commit → push で数分後に公開反映
