import { useState, useEffect } from "react";
import NoSleep from "nosleep.js";
import "./App.css";

const noSleep = new NoSleep();

const toNumString = (value: number): string => {
  if (value < 10) return `0${value}`;
  return `${value}`;
};

function openFullscreen() {
  const element = document.querySelector("body");
  if (!element) return;

  element
    .requestFullscreen()
    .then(function () {
      // element has entered fullscreen mode successfully
    })
    .catch(function (error) {
      // element could not enter fullscreen mode
      // error message
      console.log(error.message);
    });
}

function exitFullscreen() {
  document
    .exitFullscreen()
    .then(function () {
      // element has exited fullscreen mode
    })
    .catch(function (error) {
      // element could not exit fullscreen mode
      // error message
      console.log(error.message);
    });
}

function App() {
  const [isPlay, setPlay] = useState(false);
  const [workTimer, setWorkTimer] = useState(0);
  const [isFullscreen, setFullscreen] = useState(false);
  const [isAlwaysOn, setAlwaysOn] = useState(false);

  useEffect(() => {
    let playRef: ReturnType<typeof setInterval> = 0;

    if (isPlay) {
      playRef = setInterval(() => {
        setWorkTimer((t) => t + 1);
      }, 1000);
    } else {
      if (playRef) clearInterval(playRef);
    }

    return () => clearInterval(playRef);
  }, [isPlay]);

  useEffect(() => {
    if (isAlwaysOn) noSleep.enable();
    return () => noSleep.disable();
  }, [isAlwaysOn]);

  const hour = Math.floor(workTimer / 3600);
  const minute = Math.floor((workTimer - hour * 3600) / 60);
  const second = workTimer - hour * 3600 - minute * 60;

  return (
    <div>
      {/* <h1>Work Stopwatch</h1> */}
      <div className="stopwatch">
        {toNumString(hour)}:{toNumString(minute)}:{toNumString(second)}
      </div>
      <button className="play-btn" onClick={() => setPlay((p) => !p)}>
        {isPlay ? "⏸️ Pause" : "▶️ Work"}
      </button>
      {/* <button className="play-btn">▶️ Learn</button>
      <button className="play-btn">▶️ Play</button> */}
      {/* <button className="play-btn" onClick={() => setPlay(false)}>
        ⏸️ Pause All
      </button> */}
      <button
        className="play-btn"
        onClick={() => {
          if (isFullscreen) {
            exitFullscreen();
          } else {
            openFullscreen();
          }
          setFullscreen((f) => !f);
        }}
      >
        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </button>
      <button
        className="play-btn"
        onClick={() => {
          setAlwaysOn((o) => !o);
        }}
      >
        Status: {isAlwaysOn ? "Always On" : "Default"}
      </button>
    </div>
  );
}

export default App;
