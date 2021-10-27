import { MusicLengths } from './SessionSettings/MusicLengths';
import { MusicFiles } from './SessionSettings/MusicFiles';
export class SessionSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <details open={true}>
                    <summary>設定</summary>
                    <MusicLengths
                        isPlaying={this.props.isPlaying}
                        musicLengths={this.props.musicLengths}
                        onChange={this.props.musicLengthsOnChange}
                        addMusicLengthField={this.props.addMusicLengthField} 
                        removeMusicLengthField={this.props.removeMusicLengthField}/>
                    <MusicFiles
                        isPlaying={this.props.isPlaying}
                        musicFilesOnChange={this.props.musicFilesOnChange}
                        canUploadMusicFiles={this.props.canUploadMusicFiles}
                        workingMusicFiles={this.props.workingMusicFiles}
                        restingMusicFiles={this.props.restingMusicFiles}
                        postUserMusicSessionFromAPI={this.props.postUserMusicSessionFromAPI}
                    />
                </details>
            </div>
        );
    }
}
