'use strict';
import { PomodoroManager } from './pomodoro/pomodoroManager/PomodoroManager.js';
import { MusicSessionFactory } from './pomodoro/musicSessionFactory/MusicSessionFactory.js';
import { SessionSettings } from './view/SessionSettings';
import api from './view/api';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: false,
            userName: "",
            value: 10,
            musicLengths: [25, 5, 25],
            // @todo: workingMusicFilesの入力値を統一する。
            workingMusicFiles: [],
            restingMusicFiles: [],
            canUploadMusicFiles: false,
            pomodoroManager: new PomodoroManager(),
            timer: "--楽曲未設定--"
        };
    }

    // -- lifecycle methods --
    componentDidMount() {
        this.getUserMydataFromAPI();
        this.intervalId = setInterval(() => {
            this.setState({
                timer: this.state.pomodoroManager.getRemainingTimeForView()
            });
        }, 250);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    // -- methods --
    loadPomodoroSettings = async () => {
        const factory = new MusicSessionFactory();
        let musicSessions = [];

        for (let i = 0; i < this.state.musicLengths.length; i++) {
            let musics = i % 2 == 1 ? this.state.workingMusicFiles : this.state.restingMusicFiles;

            for (let j = 0; j < musics.length; j++) {
                await factory.pushTmpAudioSrc(musics[j]);
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

    addMusicLengthField = () => {
        const DEFAULT_WORKING_LENGTH = [25];
        const DEFAULT_RESTING_LENGTH = [5];
        const musicLengths = this.state.musicLengths.slice();

        let musicLength = musicLengths.length % 2 == 0 ? DEFAULT_WORKING_LENGTH : DEFAULT_RESTING_LENGTH;

        this.setState(
            { musicLengths: musicLengths.concat(musicLength) },
            this.loadPomodoroSettings
        );
    }

    removeMusicLengthField = () => {
        if (this.state.musicLengths.length <= 2){ return};

        this.setState(
            { musicLengths: this.state.musicLengths.slice(0, -1) },
            this.loadPomodoroSettings
        );
    }

    musicFilesOnChange = (workingMusicFile, restingMusicFile) => {
        let canUploadMusicFiles = false;
        
        // @todo: musicFilesのインスタンス化
        if (this.state.workingMusicFiles.every(music => music?.type == 'audio/mpeg') &&
            this.state.restingMusicFiles.every(music => music?.type == 'audio/mpeg') &&
            this.state.isLogined) {
            canUploadMusicFiles = true;
        }

        this.setState(
            {
                workingMusicFiles: workingMusicFile,
                restingMusicFiles: restingMusicFile,
                canUploadMusicFiles: canUploadMusicFiles,
            }, this.loadPomodoroSettings);
    }

    playPomodoro = () => {
        this.state.pomodoroManager.playPomodoro();
    }

    pausePomodoro = () => {
        this.state.pomodoroManager.pausePomodoro();
    }

    // -- display methods --
    displayLoginName = () => {
        return this.state.userName ? this.state.userName + "さん" : "ログイン"
    }
    
    displayMusicNames = () => {
        return "TODO: 今後PomodoroManagerから取得する"
    }

    // -- api methods --
    getUserMydataFromAPI = () => {
        api.get('users/mydata')
            .then(response => {
                this.setState({
                    isLogined: true,
                    userName: response.data.name
                })

                // 本来ここに置くべきではない、他で使用する際に切り出すこと。
                this.getUserMusicSessionFromAPI();
            })
    }

    postUserMusicSessionFromAPI = () => {
        let params = new FormData();

        if (this.state.musicLengths.length == 0) return false;
        if (this.state.workingMusicFiles.length == 0) return false;
        if (this.state.restingMusicFiles.length == 0) return false;

        // 本来この分岐に入らない想定だが、念のため。
        if (!this.state.workingMusicFiles.every(music =>  music?.type == 'audio/mpeg' ) ||
            !this.state.restingMusicFiles.every(music =>  music?.type == 'audio/mpeg' )) {
            
            console.error("ファイル以外の送信はできません"); 
            return false;
        }

        this.state.musicLengths.forEach((value) => {
            params.append("lengths[]", value);
        })

        this.state.workingMusicFiles.forEach((file) => {
            params.append("working_musics[]", file);
        })

        this.state.restingMusicFiles.forEach((file) => {
            if (typeof(file)== "string") return;
            params.append("resting_musics[]", file);
        })

        api.post('music_sessions', params)
            .then(response => {
                M.toast({ html: "音楽データを保存しました", classes: "green" });
            }).catch(err => {
                if (err.response?.data?.message) {
                    M.toast({ html: err.response.data.message, classes: "red" });
                } else {
                    M.toast({ html: "音楽データの保存に失敗しました", classes: "red" });
                }
            })

    }

    getUserMusicSessionFromAPI = () => {
        api.get('music_sessions')
            .then(response => {
                let musicSessions = response.data.music_sessions;

                // music_sessions[0]:WORKING [1]:RESTINGの前提。
                let workingMusics = musicSessions[0].links;
                let restingMusics = musicSessions[1].links;
                let musicLengths = musicSessions.map(ms => { return ms.length });

                this.setState({
                    workingMusicFiles: workingMusics,
                    restingMusicFiles: restingMusics,
                    musicLengths: musicLengths,
                }, this.loadPomodoroSettings)
            }).catch(err => {
                if(err.response.data.message){
                    M.toast({html: err.response.data.message, classes: "red"});
                }else{
                    M.toast({html: "音楽データの取得に失敗しました", classes: "red"});
                }
            })
    }

    render() {
        return (
            <div>
                <nav className="light-blue" role="navigation">
                    <div className="nav-wrapper container">
                        <a className="brand-logo">Cloud PomodoroTimer</a>
                        <ul className="right">
                            <li><a href="http://localhost:3000/auth/google_oauth2">{this.displayLoginName()}</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    {/* 表示系 */}
                    <div id="clock" className="center">{this.state.timer.toString()}</div>
                    <div className="center">曲名: {this.displayMusicNames()}</div>
                    {/* 操作系 */}
                    <audio id="pomodoro" />
                    <div className="center">
                        <button id="play" className="material-icons btn-large waves-effect waves-light side-margin" onClick={this.playPomodoro}><i className="material-icons">play_arrow</i></button>
                        <button id="pause" className="material-icons btn-large waves-effect waves-light side-margin" onClick={this.pausePomodoro}><i className="material-icons">pause</i></button>
                    </div>
                    {/* 設定系 */}
                    <SessionSettings
                        musicLengthsOnChange={this.musicLengthsOnChange}
                        musicLengths={this.state.musicLengths}
                        addMusicLengthField={this.addMusicLengthField}
                        removeMusicLengthField={this.removeMusicLengthField}
                        musicFilesOnChange={this.musicFilesOnChange}
                        canUploadMusicFiles={this.state.canUploadMusicFiles}
                        workingMusicFiles={this.state.workingMusicFiles}
                        restingMusicFiles={this.state.restingMusicFiles}
                        postUserMusicSessionFromAPI={this.postUserMusicSessionFromAPI}
                    />
                </div>
            </div>
        );
    }
}

const domContainer = document.querySelector('#pomodoroContainer');
ReactDOM.render(<Pomodoro />, domContainer);