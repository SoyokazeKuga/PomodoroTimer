import { MusicSourcesIterator } from './MusicSourcesIterator.js';

/* 
 * audios: 受け取ったAudioインスタンスを再生するクラス
 */
export class MusicSessionAudio {
    constructor(audio) {
        this.audio = audio;
        this.iterator = null;
        this.audio.addEventListener('ended', () => {
            this.play(false);
        });
    }

    set sources(sources) {
        this.iterator = new MusicSourcesIterator(sources);
        this.audio.src = this.iterator.next();
    }

    play(isPosed=true) {
        if (this.iterator.sources.length <= 0) throw "曲を設定してください";

        if (!isPosed) {
            this.audio.src = this.iterator.next();
        }

        console.info("  title: ", this.audio.src.split('/').slice(-1)[0], " audio_index: ", this.iterator.index);
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }
}