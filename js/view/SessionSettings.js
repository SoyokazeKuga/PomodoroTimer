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
                        musicLengths={this.props.musicLengths}
                        onChange={this.props.musicLengthsOnChange}
                        addMusicLengthField={this.props.addMusicLengthField} 
                        removeMusicLengthField={this.props.removeMusicLengthField}/>
                    <MusicFiles
                        musicFilesOnChange={this.props.musicFilesOnChange}
                        workingMusicFiles={this.props.workingMusicFiles}
                        restingMusicFiles={this.props.restingMusicFiles}
                    />
                </details>
            </div>
        );
    }
}
