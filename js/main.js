import {PomodoroManager} from './PomodoroManager.js';
import {MusicSessionFactory} from './MusicSessionFactory.js';

var factory = new MusicSessionFactory();
factory.create({src: "working.mp3", length: 1000 * 2});
factory.create({src: "resting.mp3", length: 1000 * 4});
factory.create({src: "working.mp3", length: 1000 * 2}); 
factory.create({src: "resting.mp3", length: 1000 * 4});
factory.create({src: "working.mp3", length: 1000 * 2});

var pomodoro = new PomodoroManager(document.getElementById("pomodoro"), factory.musicSessions);
document.getElementById("play").addEventListener("click", ()=>{pomodoro.playPomodoro()});
document.getElementById("pause").addEventListener("click", ()=>{pomodoro.pausePomodoro()});