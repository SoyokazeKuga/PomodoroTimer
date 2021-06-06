import {MusicSession} from './MusicSession.js';

export class MusicSessionFactory{
    constructor(){
        this.musicSessions = [];
    }

    create(params){
        var musicSession = this.__createMusicSession(params);
        this.__registerMusicSession(musicSession);

        return musicSession;
    }

    __createMusicSession(params){
        return new MusicSession(params);
    }

    __registerMusicSession(musicSession){
        this.musicSessions.push(musicSession);
    }
}