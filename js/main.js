import { PomodoroManager } from './PomodoroManager.js';
import { MusicSessionFactory } from './MusicSessionFactory.js';

var factory = new MusicSessionFactory();
var musicSessions = [];

factory.pushTmpAudioSrcFromPath("./0.mp3");
factory.pushTmpAudioSrcFromPath("./1.mp3");
musicSessions.push(factory.create(1000 * 2));

factory.pushTmpAudioSrcFromPath("./2.mp3");
factory.pushTmpAudioSrcFromPath("./3.mp3");
musicSessions.push(factory.create(1000 * 2));

factory.pushTmpAudioSrcFromPath("./4.mp3");
factory.pushTmpAudioSrcFromPath("./5.mp3");
musicSessions.push(factory.create(1000 * 5));

window.syykzPomodoro = new PomodoroManager(document.getElementById("pomodoro"), musicSessions);
document.getElementById("play").addEventListener("click", () => { window.syykzPomodoro.playPomodoro() });
document.getElementById("pause").addEventListener("click", () => { window.syykzPomodoro.pausePomodoro() });