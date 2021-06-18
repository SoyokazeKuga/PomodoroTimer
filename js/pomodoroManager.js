import { MusicSessionAudio } from './MusicSessionAudio.js';
import { SessionIterator } from './SessionIterator.js';


export class PomodoroManager {
    constructor(audioElement, musicSessions) {
        this.audio = audioElement;
        this.audio.volume = 0.05;

        this.musicSessionsMaster = musicSessions;

        this.musicSessions = musicSessions;

        this.sessionIterator = new SessionIterator(this.musicSessions);

        this.musicSessionAudio = new MusicSessionAudio(this.audio);
        this.musicSessionAudio.sources = this.musicSessions[0].sources;

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
        this.musicSessionAudio.play();
    }

    pauseMusic() {
        this.musicSession.time.updateRemainingTime();
        this.musicSessionAudio.pause();
    }

    switchMusic() {
        this.musicSession = this.sessionIterator.next();
        this.musicSessionAudio.sources = this.musicSession.sources;
    }

    /*
    * MusicSessionでの指定に従い、曲を再生する 
    * hasNext: 次のSessionに進めるならTrue
    */
    playMusicSession(hasNext = false) {
        var isPaused = !hasNext && !!this.nextMusicSession;

        // Bug: 最後のmusicSession途中でpauseしたとき、再開しない。
        if (!this.sessionIterator.hasNext() && !isPaused) {
            this.sessionIterator = new SessionIterator(this.musicSessionsMaster);
            this.musicSessionAudio.sources = this.musicSessionsMaster[0].sources;
            this.nextMusicSession = null;

            console.info("End");

            return;
        }

        if (!isPaused) this.switchMusic();

        this.playMusic();

        // アロー関数式を用いてthisの指定を関数定義時点でのスコープに縛っている
        // remainingTimeはpausePomodoro()時に更新される。hasNext=Trueのとき、remainingTimeは考慮せず次の曲に遷移する。
        this.nextMusicSession = setTimeout(() => { this.playMusicSession(true) }, this.musicSession.time.remainingTime);
    }
}