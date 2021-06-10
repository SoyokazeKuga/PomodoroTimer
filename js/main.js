import { PomodoroManager } from './PomodoroManager.js';
import { MusicSessionFactory } from './MusicSessionFactory.js';

var factory = new MusicSessionFactory();
var musicSessions = [];

factory.pushTmpAudioSrcFromPath("./0.mp3");
factory.pushTmpAudioSrcFromPath("./1.mp3");
factory.pushTmpAudioSrcFromPath("./2.mp3");
musicSessions.push(factory.create(1000 * 20));

var pomodoro = new PomodoroManager(document.getElementById("pomodoro"), musicSessions);
document.getElementById("play").addEventListener("click", () => { pomodoro.playPomodoro() });
document.getElementById("pause").addEventListener("click", () => { pomodoro.pausePomodoro() });