class SessionIterator {
    constructor(sessions) {
        this.index = 0;
        this.sessions = sessions;
    }

    hasNext() {
        if (this.index < this.sessions.length) return true;

        return false;
    }

    next() {
        var session = this.sessions[this.index];
        this.index++;

        return session;
    }

    initIndex() {
        this.index = 0;
    }
}


// 残り時間の算出クラス。timeはミリ秒
class Timer {
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


class PomodoroManager {
    constructor(audioElement, musicSessions) {
        this.audio = audioElement;
        this.audio.volume = 0.02;

        this.sessionIterator = new SessionIterator(musicSessions);

        this.nextMusicSession = null;
    }

    playPomodoro() {
        this.playMusicSession();
    }

    pausePomodoro() {
        this.pauseMusic();
        clearTimeout(this.nextMusicSession);
    }

    playMusic() {
        this.musicSession.time.setStartTime();
        this.audio.play();
    }

    pauseMusic() {
        this.musicSession.time.updateRemainingTime();
        this.audio.pause();
    }

    switchMusic() {
        this.musicSession = this.sessionIterator.next();
        this.audio.src = this.musicSession.src;
        this.audio.load();
    }

    /*
    * MusicSessionでの指定に従い、曲を再生する 
    * hasNext: 次のSessionに進めるならTrue
    */
    playMusicSession(hasNext = false) {
        if (!this.sessionIterator.hasNext()) {
            console.info("End");
            this.sessionIterator.initIndex();
            this.pauseMusic();
            return;
        }

        var isPaused = !hasNext && !!this.nextMusicSession;
        if (!isPaused) this.switchMusic();

        this.playMusic();

        // アロー関数式を用いてthisの指定を関数定義時点でのスコープに縛っている
        // remainingTimeはpausePomodoro()時に更新される。hasNext=Trueのとき、remainingTimeは考慮せず次の曲に遷移する。
        this.nextMusicSession = setTimeout(() => { this.playMusicSession(true) }, this.musicSession.time.remainingTime);
    }
}
