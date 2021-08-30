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
                        <div className="col s6" /*onclick="pomodoroAddMusicLengthRow()"*/>
                            <a className="btn-large waves-effect waves-light red"><i className="material-icons">枠を追加</i></a>
                        </div>
                        <div className="col s6">
                            <a className="btn-large waves-effect waves-light red"><i className="material-icons">枠を減らす</i></a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}