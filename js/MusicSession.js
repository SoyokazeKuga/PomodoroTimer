class MusicSession {
    constructor(params) {
        this.src = params.src;
        this.length = params.length;
        this.time = new Timer(this.length);
    }
}