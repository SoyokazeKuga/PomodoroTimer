import {SessionIterator} from './SessionIterator.js';


export class PomodoroManager {
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
