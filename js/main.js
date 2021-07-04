import { PomodoroManager } from './pomodoro/pomodoroManager/PomodoroManager.js';
import { MusicSessionFactory } from './pomodoro/musicSessionFactory/MusicSessionFactory.js';

window.syykzPomodoro = new PomodoroManager(document.getElementById("pomodoro"));
document.getElementById("play").addEventListener("click", () => { window.syykzPomodoro.playPomodoro() });
document.getElementById("pause").addEventListener("click", () => { window.syykzPomodoro.pausePomodoro() });

window.musicSessionSettingsLoad = async () => {
    const factory = new MusicSessionFactory();
    let sessionLengths = document.getElementsByClassName('musicSessionLengths');
    let workingMusics = document.getElementsByClassName('workingMusics')[0];
    let restingMusics = document.getElementsByClassName('restingMusics')[0];
    let musicSessions = [];

    for (let i = 0; i < sessionLengths.length; i++) {
        let musics = null;

        if (i % 2 == 0) {
            musics = workingMusics;
        } else {
            musics = restingMusics;
        }

        // 初期値 仕様にするかは検討する
        if(musics.files.length == 0) factory.pushTmpAudioSrcFromPath('/0.mp3');

        for (let j = 0; j < musics.files.length; j++) {
            await factory.pushTmpAudioSrcFromInputFile(musics.files[j]);
        }

        musicSessions.push(factory.create(sessionLengths[i].value * 1000 * 60));
    }

    window.syykzPomodoro.loadMusicSession(musicSessions);
}

window.onload = musicSessionSettingsLoad();