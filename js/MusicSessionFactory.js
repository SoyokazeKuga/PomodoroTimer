import { MusicSession } from './MusicSession.js';

export class MusicSessionFactory {
    constructor() {
        this.temporaryAudioSources = [];
    }

    create(length) {
        if (this.temporaryAudioSources.length <= 0) throw "1曲以上設定してください";
        var musicSession = new MusicSession(this.temporaryAudioSources, length);

        this.temporaryAudioSources = [];

        return musicSession;
    }

    pushTmpAudioSrcFromInputFile(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            this.temporaryAudioSources.push(reader.result);
        }
    }

    pushTmpAudioSrcFromPath(path) {
        this.temporaryAudioSources.push(path);
    }
}