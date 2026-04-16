/**
 * 🌟 AIスワップ用ファイル 🌟
 * このファイルは、教科書の画像がアップロードされた際にAIが書き換える「問題生成ロジック」専用ファイルです。
 * 常に `window.ProblemGenerator` として機能を提供します。
 */
window.ProblemGenerator = {
    // 先生に表示する「今日のドリル」のタイトル
    topicName: "整数と小数 (10倍、1/10など)",

    // 問題を生成して { questionText, answerText } を返す関数
    generate: function() {
        // 教科書のパターンに基づいたベース数字の生成
        const patterns = [
            () => (Math.floor(Math.random() * 900) + 100) / 100,      // X.XX (例: 2.93)
            () => (Math.floor(Math.random() * 900) + 100) / 10,       // XX.X (例: 40.1)
            () => (Math.floor(Math.random() * 90000) + 10000) / 1000, // XX.XXX (例: 42.195)
            () => (Math.floor(Math.random() * 999) + 1) / 1000,       // 0.XXX (例: 0.082)
            () => Math.floor(Math.random() * 990) + 10                // XX (例: 70)
        ];
        const baseNum = patterns[Math.floor(Math.random() * patterns.length)]();

        // ランダムな操作の選択
        const ops = [
            { type: 'mul', val: 10, str: '× 10' },
            { type: 'mul', val: 100, str: '× 100' },
            { type: 'mul', val: 1000, str: '× 1000' },
            { type: 'div', val: 10, str: '÷ 10' },
            { type: 'div', val: 100, str: '÷ 100' },
            { type: 'div', val: 1000, str: '÷ 1000' },
            { type: 'div', val: 10, str: 'の 1/10' },
            { type: 'div', val: 100, str: 'の 1/100' },
            { type: 'div', val: 1000, str: 'の 1/1000' }
        ];
        const op = ops[Math.floor(Math.random() * ops.length)];

        // 計算式の作成と答えの算出
        let ans;
        let questionText = `${baseNum} ${op.str}`;

        if (op.type === 'mul') {
            ans = baseNum * op.val;
        } else {
            ans = baseNum / op.val;
        }

        // 浮動小数点の計算誤差を回避するため、有効数字の範囲内で正しく丸める
        // 小数点の移動（最大5桁の数字＋3桁シフト）なので8桁あれば十分カバー可能。
        ans = Number(parseFloat(ans.toFixed(8)));

        return {
            questionText: questionText,
            answerText: ans.toString()
        };
    }
};
