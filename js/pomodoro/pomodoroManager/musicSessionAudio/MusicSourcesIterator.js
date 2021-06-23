export class MusicSourcesIterator {
    constructor(sources) {
        this.index = 0;
        this.sources = sources;
    }

    next() {
        if (this.index >= this.sources.length) this.index = 0;

        var session = this.sources[this.index];
        this.index++;

        return session;
    }
}