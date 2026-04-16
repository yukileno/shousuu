/**
 * シンプル算数アプリ用 バックエンド (GAS)
 * これをGoogle Apps Scriptエディタにコピペして、「デプロイ」>「新しいデプロイ」>「ウェブアプリ」として公開してください。
 * アクセスできるユーザーは「全員」に設定します。
 */

function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(['Timestamp', 'Topic', 'Name', 'Score']);
    sheet.getRange("A1:D1").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'submit') {
      const sheetName = data.sheetName || 'Ranking';
      const sheet = getOrCreateSheet(sheetName);
      
      const timestamp = new Date();
      sheet.appendRow([timestamp, data.topic, data.name, Number(data.score)]);
      
      return ContentService.createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getTop') {
      const topic = e.parameter.topic;
      const sheetName = e.parameter.sheetName || 'Ranking';
      
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName(sheetName);
      
      if(!sheet) {
         return ContentService.createTextOutput(JSON.stringify({ranking: []}))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      const data = sheet.getDataRange().getValues();
      let results = [];
      for(let i = 1; i < data.length; i++) {
        // data[i][1] is Topic, data[i][2] is Name, data[i][3] is Score
        if(data[i][1] === topic) {
          results.push({
            name: data[i][2],
            score: Number(data[i][3])
          });
        }
      }
      
      results.sort((a,b) => b.score - a.score);
      results = results.slice(0, 30);
      
      return ContentService.createTextOutput(JSON.stringify({ranking: results}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({message: "API is working"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
