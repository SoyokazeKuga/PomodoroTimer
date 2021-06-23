export class FileReaderEx extends FileReader {
    constructor() {
        super();
    }

    _readAs(blob, ctx) {
        return new Promise((res, rej) => {
            super.addEventListener("load", ({ target }) => res(target.result));
            super.addEventListener("error", ({ target }) => rej(target.error));
            super[ctx](blob);
        });
    }

    readAsDataURL(blob) {
        return this._readAs(blob, "readAsDataURL");
    }
}