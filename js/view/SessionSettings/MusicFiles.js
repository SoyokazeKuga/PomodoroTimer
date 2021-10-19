export class MusicFiles extends React.Component {
    constructor(props) {
        super(props);
        this.workingMusicInput = React.createRef();
        this.restingMusicInput = React.createRef();
    }

    displayMusicNames = (musicFiles) => {
        if (musicFiles.length == 0) return(<p className="red-text">　 音楽を選択してください(※複数選択可)</p>);

        let musicNames = musicFiles.map((music) => {
            // アップロードしたとき: [{name:'a.mp3', ...}, ...]
            // APIから取得したとき: ["http://a.mp3", ...]
            if (music["name"]) return music["name"];
            if (typeof (music) == "string") return music.split("/").slice(-1)[0];
            return "名称不明"
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
                <div className="col s6 card teal lighten-5">
                    <div>
                        <ul>
                            <li className="card-title">作業中の音楽</li>
                            {this.displayMusicNames(this.props.workingMusicFiles)}
                            <li className="card-title">休憩中の音楽</li>
                            {this.displayMusicNames(this.props.restingMusicFiles)}
                        </ul>
                    </div>
                    <div className="card-action">
                        <div onChange={this.onChange}>
                            <div>
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <i className="material-icons">audiotrack 作業中の音楽を選択</i>
                                        <input type="file" className="workingMusics" accept="audio/*" multiple ref={this.workingMusicInput} />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate visibility-none" type="text" placeholder="Upload one or more files" multiple></input>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <i className="material-icons">audiotrack 休憩中の音楽を選択</i>
                                        <input type="file" className="restingMusics" accept="audio/*" multiple ref={this.restingMusicInput} />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate visibility-none" type="text" placeholder="Upload one or more files"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button disabled={!this.props.canUploadMusicFiles} className="material-icons btn waves-effect waves-light" onClick={this.props.postUserMusicSessionFromAPI}>
                                <i className="material-icons">backup サーバに保存</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}