// 残り時間の算出クラス。timeはミリ秒
export class Timer {
    constructor(remainingTime) {
        this.startTime = null;
        this.remainingTime = remainingTime;
    }

    // 曲の開始時間を設定する。曲の途中で始まった場合、経過時間を保持する。
    setStartTime() {
        this.startTime = new Date();
    }

    // 曲の残り時間を更新する
    updateRemainingTime() {
        this.remainingTime -= (new Date() - this.startTime);
    }
}

