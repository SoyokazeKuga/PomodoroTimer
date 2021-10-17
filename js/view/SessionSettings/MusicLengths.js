import { MusicLengthInput } from './MusicLengthInput/MusicLengthInput'
export class MusicLengths extends React.Component {
    constructor(props) {
        super(props);
    }

    viewList = () => {
        let lengthHTML = this.props.musicLengths.map((length, index) => {
            return (
                <MusicLengthInput
                    key={index.toString()}
                    value={length}
                    index={index}
                    onChange={this.props.onChange}
                />
            );
        });

        return (
            <ul>
                {lengthHTML}
            </ul>

        );
    }

    render() {
        return (
            <div className="col s6">
                <div>
                    時間割
                    {this.viewList()}
                    <div>
                        <div className="col s6" onClick={this.props.addMusicLengthField}>
                            <button className="material-icons btn-small waves-effect waves-light">+</button>
                        </div>
                        <div className="col s6" onClick={this.props.removeMusicLengthField}>
                            <button className="material-icons btn-small waves-effect waves-light">-</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}