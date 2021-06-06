export class SessionIterator {
    constructor(sessions) {
        this.index = 0;
        this.sessions = sessions;
    }

    hasNext() {
        if (this.index < this.sessions.length) return true;

        return false;
    }

    next() {
        var session = this.sessions[this.index];
        this.index++;

        return session;
    }

    initIndex() {
        this.index = 0;
    }
}