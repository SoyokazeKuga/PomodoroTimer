import { PomodoroManager } from './pomodoro/pomodoroManager/PomodoroManager.js';
import { MusicSessionFactory } from './pomodoro/musicSessionFactory/MusicSessionFactory.js';

window.syykzPomodoro = new PomodoroManager(document.getElementById("pomodoro"));
document.getElementById("play").addEventListener("click", () => { window.syykzPomodoro.playPomodoro() });
document.getElementById("pause").addEventListener("click", () => { window.syykzPomodoro.pausePomodoro() });

window.musicSessionSettingsLoad = async () => {
    var factory = new MusicSessionFactory();
    var musicSessions = [];
    var musicSessionLengths = document.getElementsByClassName('musicSessionLengths');

    var workingMusics = document.getElementsByClassName('workingMusics');
    await factory.pushTmpAudioSrcFromInputFile(workingMusics[0].files[0]);

    factory.pushTmpAudioSrcFromPath("./0.mp3");
    factory.pushTmpAudioSrcFromPath("./1.mp3");
    musicSessions.push(factory.create(musicSessionLengths[0].value * 1000 * 60));

    factory.pushTmpAudioSrcFromPath("./2.mp3");
    factory.pushTmpAudioSrcFromPath("./3.mp3");
    musicSessions.push(factory.create(musicSessionLengths[1].value * 1000 * 60));

    factory.pushTmpAudioSrcFromPath("./4.mp3");
    factory.pushTmpAudioSrcFromPath("./5.mp3");
    musicSessions.push(factory.create(musicSessionLengths[2].value * 1000 * 60));

    window.syykzPomodoro.loadMusicSession(musicSessions);
}