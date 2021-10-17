export class MusicFiles extends React.Component {
    constructor(props) {
        super(props);
        this.workingMusicInput = React.createRef();
        this.restingMusicInput = React.createRef();
    }

    displayMusicNames = (musicFiles) => {
        let musicNames = musicFiles.map((music) => {
            // アップロードしたとき: [{name:'a.mp3', ...}, ...]
            // APIから取得したとき: ["http://a.mp3", ...]
            if (music["name"]) return music["name"];
            if (typeof (music) == "string") return music
            return "error: 未対応の音楽ファイル"
        });

        return (
            <ol>
                {musicNames.map((name, index) => <li key={index.toString()}>{name}</li>)}
            </ol>
        );
    }

    onChange = () => {
        this.props.musicFilesOnChange(
            Object.values(this.workingMusicInput.current.files),
            Object.values(this.restingMusicInput.current.files));
    }

    render() {
        return (
            <div>
                <div className="col s6">
                    <div>
                        <ul>
                            <li>作業中の音楽</li>
                            {this.displayMusicNames(this.props.workingMusicFiles)}
                            <li>休憩中の音楽</li>
                            {this.displayMusicNames(this.props.restingMusicFiles)}
                        </ul>
                    </div>
                    <div>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>作業中の音楽を追加</span>
                                <input type="file" className="workingMusics" accept="audio/*" multiple ref={this.workingMusicInput} onChange={this.onChange} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload one or more files" multiple></input>
                                <input type="hidden" multiple></input>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>休憩中の音楽を追加</span>
                                <input type="file" className="restingMusics" accept="audio/*" multiple ref={this.restingMusicInput} onChange={this.onChange} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload one or more files"></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}