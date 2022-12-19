import React, { useRef, useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Audio from "./Components/Audio/Audio";
import { data } from "./data";

import "./App.css";
const App = () => {
  const audioRef = useRef();
  const [check, setCheck] = useState(false);
  const [play, setPlay] = useState(false);
  const [playLenght, setPlayLength] = useState(0);
  const [playList, setPlayList] = useState(data); //list from data
  const [currentSong, setCurrentSong] = useState(playList[0]);

  return (
    <div className="wrapper">
      <Sidebar
        audioRef={audioRef}
        playList={playList}
        setPlayList={setPlayList}
        play={play}
        setPlay={setPlay}
        setPlayLength={setPlayLength}
        check={check}
        setCheck={setCheck}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
      <Audio
        play={play}
        setPlay={setPlay}
        playList={playList}
        setPlayList={setPlayList}
        playLenght={playLenght}
        setPlayLength={setPlayLength}
        setCheck={setCheck}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
};

export default App;
