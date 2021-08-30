export class MusicFiles extends React.Component {
    constructor(props) {
        super(props);
        this.workingMusicInput = React.createRef();
        this.restingMusicInput = React.createRef();
    }

    onChange = () => {
        this.props.musicFilesOnChange(
            this.workingMusicInput.current.files,
            this.restingMusicInput.current.files);
    }

    render() {
        return (
            <div>
                <div className="col s6">
                    <div>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Working Music Files</span>
                                <input type="file" className="workingMusics" accept="audio/*" multiple ref={this.workingMusicInput} onChange={this.onChange} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload one or more files"
                                    multiple></input>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Resting Music Files</span>
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