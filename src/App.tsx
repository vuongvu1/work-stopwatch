import { useState, useEffect } from "react";
import "./App.css";

const to2numString = (value: number): string => {
  if (value < 10) return `0${value}`;
  return `${value}`;
};

function App() {
  const [isPlay, setPlay] = useState(false);
  const [workTimer, setWorkTimer] = useState(0);

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

  const hour = Math.floor(workTimer / 3600);
  const minute = Math.floor((workTimer - hour * 3600) / 60);
  const second = workTimer - hour * 3600 - minute * 60;

  return (
    <div>
      {/* <h1>Work Stopwatch</h1> */}
      <div className="stopwatch">
        {to2numString(hour)}:{to2numString(minute)}:{to2numString(second)}
      </div>
      <button className="play-btn" onClick={() => setPlay(true)}>
        ▶️ Work
      </button>
      {/* <button className="play-btn">▶️ Learn</button>
      <button className="play-btn">▶️ Play</button> */}
      <button className="play-btn" onClick={() => setPlay(false)}>
        ⏸️ Pause
      </button>
    </div>
  );
}

export default App;
