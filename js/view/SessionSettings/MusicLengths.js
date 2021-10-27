import { MusicLengthInput } from './MusicLengthInput/MusicLengthInput'
export class MusicLengths extends React.Component {
    constructor(props) {
        super(props);
    }

    viewList = () => {
        let lengthHTML = this.props.musicLengths.map((length, index) => {
            return (
                <MusicLengthInput
                    isPlaying={this.props.isPlaying}
                    key={index.toString()}
                    value={length}
                    index={index}
                    onChange={this.props.onChange}
                />
            );
        });

        return (
            <ol className="music-session-list">
                <p className="blue-grey-text">作業時間(分)</p>
                {lengthHTML}
            </ol>

        );
    }

    render() {
        return (
            <div className="col s6">
                <div className="card teal lighten-5">
                    <div className="card-content">
                    <span className="card-title">時間割</span>
                        {this.viewList()}
                    </div>
                    <div className="card-action container">
                        <button disabled={this.props.isPlaying} onClick={this.props.addMusicLengthField} className="material-icons btn waves-effect waves-light">+ 時間割を追加</button>
                        <button disabled={this.props.isPlaying} onClick={this.props.removeMusicLengthField} className="material-icons btn-small waves-effect waves-light right">-</button>
                    </div>
                </div>
            </div>

        )
    }
}