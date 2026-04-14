/**
 * 🌟 AIスワップ用ファイル 🌟
 * このファイルは、教科書の画像がアップロードされた際にAIが書き換える「問題生成ロジック」専用ファイルです。
 * 常に `window.ProblemGenerator` として機能を提供します。
 */
window.ProblemGenerator = {
    // 先生に表示する「今日のドリル」のタイトル
    topicName: "小数の掛け算 (デモ)",

    // 問題を生成して { questionText, answerText } を返す関数
    generate: function() {
        // 小数の掛け算デモ (例: 0.1〜0.9 × 0.1〜0.9)
        const a = Math.floor(Math.random() * 9) + 1; // 1~9
        const b = Math.floor(Math.random() * 9) + 1; // 1~9
        
        const floatA = a / 10;
        const floatB = b / 10;
        
        // 浮動小数点の計算誤差を防ぐため整数計算して戻す
        const ans = (a * b) / 100;
        
        return {
            questionText: `${floatA} × ${floatB}`,
            answerText: ans.toString()
        };
    }
};
