import dayjs from 'dayjs';

window.dayjs = dayjs;

// 残り時間の算出クラス。timeはミリ秒
export class Timer {
    constructor(sessionLength) {
        this.startTime = null;
        this.remainingTime = sessionLength;
        this.sessionLength = sessionLength;
    }

    // 曲の開始時間を設定する。曲の途中で始まった場合、経過時間を保持する。
    setStartTime() {
        this.startTime = new Date();

        console.log(dayjs().format());
    }

    // 曲の残り時間を更新する
    updateRemainingTime() {
        this.remainingTime -= (new Date() - this.startTime);

        // pause時にupdateする前提、pause以外で本メソッドを使う場合はstartTimeの初期化の必要性を考慮する必要がある
        this.startTime = null;
    }

    getRemainingTimeForView() {
        let fromIsPosed = this.startTime == null ? 0 : new Date() - this.startTime

        // dayjs.formatは日付用のため、24時間を超えると0に戻る。タイマーとして扱うのは本来不適。
        return dayjs(this.remainingTime - fromIsPosed).add(-9, "hour").format('HH:mm:ss');
    }
}