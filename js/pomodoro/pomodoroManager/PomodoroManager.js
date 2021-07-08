import { MusicSessionAudio } from './musicSessionAudio/MusicSessionAudio.js';
import { SessionIterator } from './SessionIterator.js';


export class PomodoroManager {
    constructor(audioElement) {
        this.audio = audioElement;
        this.audio.volume = 0.05;

        this.musicSessionAudio = new MusicSessionAudio(this.audio);

        this.musicSessionsMaster = null;
        this.musicSessions = null;
        this.musicSession = null;
        this.sessionIterator = null

        this.nextMusicSession = null;
    }

    loadMusicSession(musicSessions) {
        this.musicSessionsMaster = musicSessions;
        this.musicSessions = musicSessions;

        this.sessionIterator = new SessionIterator(musicSessions);
        this.musicSessionAudio.sources = musicSessions[0].sources;
    }

    playPomodoro() {
        if (this.musicSessions == null) throw "musicSessionを設定してください";
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

    getRemainingTimeForView() {
        if (this.musicSession == null) return "-設定入力待ち-";

        return this.musicSession.time.getRemainingTimeForView();
    }
}