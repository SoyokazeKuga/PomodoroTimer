import { MusicSourcesIterator } from './MusicSourcesIterator.js';

/* 
 * audios: 受け取ったAudioインスタンスを再生するクラス
 */
export class MusicSessionAudio {
    constructor(audio) {
        this.audio = audio;
        this.iterator = null;
    }

    set sources(sources) {
        this.iterator = new MusicSourcesIterator(sources);
    }

    play() {
        if (this.iterator.sources.length <= 0) throw "曲を設定してください";

        this.audio.src = this.iterator.next();
        console.info("title: ", this.audio.src);

        this.audio.play();
        this.audio.onended = () => {
            this.play();
        }
    }

    pause() {
        this.audio.pause();
    }
}