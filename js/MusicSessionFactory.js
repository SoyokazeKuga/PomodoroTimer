import { MusicSession } from './MusicSession.js';
import { FileReaderEx } from './utility.js';

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

    async pushTmpAudioSrcFromInputFile(file) {
        var reader = new FileReaderEx();

        this.temporaryAudioSources.push(await reader.readAsDataURL(file));
    }

    pushTmpAudioSrcFromPath(path) {
        this.temporaryAudioSources.push(path);
    }
}