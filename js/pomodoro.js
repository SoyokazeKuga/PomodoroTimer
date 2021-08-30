'use strict';
import { PomodoroManager } from './pomodoro/pomodoroManager/PomodoroManager.js';
import { MusicSessionFactory } from './pomodoro/musicSessionFactory/MusicSessionFactory.js';
import { SessionSettings } from './view/SessionSettings';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 10,
            musicLengths: [5, 10, 15],
            workingMusicFiles: null,
            restingMusicFiles: null,
            pomodoroManager: new PomodoroManager(),
            timer: "--楽曲未設定--"
        };
        this.worikingMusicFileInput = React.createRef();
    }

    loadPomodoroSettings = async () => {
        const factory = new MusicSessionFactory();
        let musicSessions = [];

        for (let i = 0; i < this.state.musicLengths.length; i++) {
            let musics = i % 2 == 1 ? this.state.workingMusicFiles : this.state.restingMusicFiles;

            for (let j = 0; j < musics.length; j++) {
                await factory.pushTmpAudioSrcFromInputFile(musics[j]);
            }

            musicSessions.push(factory.create(this.state.musicLengths[i] * 1000 * 60));
        }

        this.state.pomodoroManager.loadMusicSession(musicSessions);
    }

    musicLengthsOnChange = (value, index) => {
        let musicLengths = this.state.musicLengths.slice();
        musicLengths[index] = value;
        this.setState(
            { musicLengths: musicLengths },
            this.loadPomodoroSettings);
    }

    musicFilesOnChange = (workingMusicFile, restingMusicFile) => {
        this.setState(
            {
                workingMusicFiles: workingMusicFile,
                restingMusicFiles: restingMusicFile,
            }, this.loadPomodoroSettings);
    }

    playPomodoro = () => {
        this.state.pomodoroManager.playPomodoro();
    }

    pausePomodoro = () => {
        this.state.pomodoroManager.pausePomodoro();
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({
                timer: this.state.pomodoroManager.getRemainingTimeForView()
            });
        }, 250);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div className="container">
                {/* 表示系 */}
                <div>{this.state.timer.toString()}</div>
                {/* <Display /> */}
                <audio id="pomodoro" />
                <div>
                    <button id="play" onClick={this.playPomodoro}>
                        再生
                    </button>
                    <button id="pause" onClick={this.pausePomodoro}>
                        停止
                    </button>
                </div>
                {/* 設定系 */}
                <SessionSettings
                    musicLengthsOnChange={this.musicLengthsOnChange}
                    musicLengths={this.state.musicLengths}
                    musicFilesOnChange={this.musicFilesOnChange}
                />
            </div>
        );
    }
}

const domContainer = document.querySelector('#pomodoroContainer');
ReactDOM.render(<Pomodoro />, domContainer);