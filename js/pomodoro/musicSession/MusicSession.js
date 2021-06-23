import { Timer } from "./Timer.js";

export class MusicSession {
    constructor(sources, length) {
        this.sources = sources;
        this.length = length;
        this.time = new Timer(this.length);
    }
}