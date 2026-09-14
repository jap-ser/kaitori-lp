/*
 * 買取LP 査定フォームの受け口（Google Apps Script）
 * - LPからのPOST（JSON）を受けて、Googleスプレッドシート「買取LP 査定依頼」に1行追加
 * - 同時に NOTIFY_TO へメール通知
 * - スプレッドシートは初回受信時に自動作成され、IDをスクリプトプロパティに保存
 * 配置先: script.google.com のプロジェクト「買取LP 査定フォーム受付」
 * 公開: デプロイ → ウェブアプリ → 実行ユーザー=自分 / アクセス=全員
 */
var NOTIFY_TO = 'kota0206h7@gmail.com,jap-ser@outlook.jp';
var SHEET_TITLE = '買取LP 査定依頼';
var COLS = ['受信日時','種別','市区町村','住所','状況','築年数','ご希望','時期','お名前','電話','メール','連絡方法','備考','ページ'];

function getSheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_ID');
  var ss = null;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) { ss = SpreadsheetApp.create(SHEET_TITLE); props.setProperty('SHEET_ID', ss.getId()); }
  var sh = ss.getSheets()[0];
  if (sh.getLastRow() === 0) { sh.appendRow(COLS); sh.setFrozenRows(1); }
  return { ss: ss, sh: sh };
}

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var s = getSheet_();
    var row = [new Date()];
    for (var i = 1; i < COLS.length; i++) row.push(d[COLS[i]] || '');
    s.sh.appendRow(row);
    var lines = [];
    for (var j = 1; j < COLS.length; j++) if (d[COLS[j]]) lines.push(COLS[j] + '：' + d[COLS[j]]);
    MailApp.sendEmail({
      to: NOTIFY_TO,
      subject: '【買取LP】査定依頼 ' + (d['お名前'] || '') + '様（' + (d['市区町村'] || '') + '）',
      body: lines.join('\n') + '\n\n一覧（スプレッドシート）: ' + s.ss.getUrl()
    });
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

function doGet() { return out_({ ok: true, ping: true }); }

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/* 初回の権限承認と動作確認用。エディタで実行するとシートを作ってURLをログに出す */
function setupTest() {
  var s = getSheet_();
  Logger.log(s.ss.getUrl());
}
