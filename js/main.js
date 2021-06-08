import {PomodoroManager} from './PomodoroManager.js';
import {MusicSessionFactory} from './MusicSessionFactory.js';

var factory = new MusicSessionFactory();
var musicSessions = [];
musicSessions.push(factory.create({src: "working.mp3", length: 1000 * 2}));
musicSessions.push(factory.create({src: "resting.mp3", length: 1000 * 4}));
musicSessions.push(factory.create({src: "working.mp3", length: 1000 * 2})); 
musicSessions.push(factory.create({src: "resting.mp3", length: 1000 * 4}));
musicSessions.push(factory.create({src: "working.mp3", length: 1000 * 2}));

var pomodoro = new PomodoroManager(document.getElementById("pomodoro"), musicSessions);
document.getElementById("play").addEventListener("click", ()=>{pomodoro.playPomodoro()});
document.getElementById("pause").addEventListener("click", ()=>{pomodoro.pausePomodoro()});