class MusicSession {
    constructor(src, length) {
        this.src = src;
        this.length = length;
        this.time = new Timer(length);
    }
}