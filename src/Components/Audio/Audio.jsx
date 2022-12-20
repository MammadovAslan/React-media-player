import React, { useRef, useState } from "react";
import s from "./Audio.module.css";
import Button from "./Buttons/Button";
import SpeedButton from "./Buttons/SpeedButton";

const Audio = (props) => {
  const [duration, setDuration] = useState("");
  const [playingTime, setPlayingTime] = useState("00:00");
  const [volume, setVolume] = useState(0.5);
  const [rotation, setRotation] = useState(0);

  const soundRef = useRef();
  const prevRef = useRef();
  const nextRef = useRef();
  // this 3 refs used to blur next,prev and volume buttons, to allow play/pause on space-bar

  const audioRef = useRef(); //main audio ref
  //*-----------------------Audio controls handlers-----------------------------

  const playHandler = () => {
    audioRef.current.play();
    props.setPlay(true);
  };

  const pauseHandler = () => {
    audioRef.current.pause();
    props.setPlay(false);
  };

  const mute = () => {
    audioRef.current.volume = 0;
    setVolume(0);
  };

  const volumeChangeHandler = (e) => {
    setVolume(audioRef.current.volume);
    audioRef.current.volume = e.target.value / 100;
    soundRef.current.blur();
  };

  const durationChangeHandler = (e) => {
    audioRef.current.currentTime = Math.floor((e.target.value * audioRef.current.duration) / 100);
  };

  //*------Set current song in sidebar when skip track backward of forward----------

  const reRenderPlayList = (index) => {
    props.setPlayList(
      props.playList.map((el, id) => {
        if (id === index) {
          el.active = true;
          return el;
        } else {
          el.active = false;
          return el;
        }
      })
    );
  };
  //*--------------Skip backward/forward-------------------
  const setPrevSong = () => {
    props.setPlayLength(0);
    const index = props.playList.findIndex((x) => x.name == props.currentSong.name);
    if (index === 0) {
      props.setCurrentSong(props.playList[props.playList.length - 1]);
      reRenderPlayList(props.playList.length - 1);
    } else {
      props.setCurrentSong(props.playList[index - 1]);
      reRenderPlayList(index - 1);
    }
    setRotation(0);
    prevRef.current.blur();
  };

  const setNextSong = () => {
    props.setPlayLength(0);
    const index = props.playList.findIndex((x) => x.name == props.currentSong.name);
    if (index === props.playList.length - 1) {
      props.setCurrentSong(props.playList[0]);
      reRenderPlayList(0);
    } else {
      props.setCurrentSong(props.playList[index + 1]);
      reRenderPlayList(index + 1);
    }
    setRotation(0);
    nextRef.current.blur();
  };

  //*--------------Reset song-------------------
  const setPlaybackRate = (rate) => {
    audioRef.current.playbackRate = rate;
  };

  //*--------------Play/pause Forward/backward on keys-------------------
  document.body.onkeyup = function (e) {
    if (e.code === "Space" && e.target.tagName === "BODY") {
      !props.play ? audioRef.current.play() : audioRef.current.pause();
    } else if (e.code === "ArrowRight") {
      setNextSong();
    } else if (e.code === "ArrowLeft") {
      setPrevSong();
    }
  };

  const timeUpdateHandler = () => {
    const ct = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const minutes = Math.floor(ct / 60);
    const seconds = Math.floor(ct - +Math.floor(ct / 60) * 60);
    const result =
      ct < 60
        ? `00:${Math.floor(ct) > 9 ? Math.floor(ct) : `0${Math.floor(ct)}`}`
        : `0${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`;
    props.setPlayLength(Math.floor((ct * 100) / duration));
    setPlayingTime(result);
    setRotation(ct * 4);
    ct === 0 && playHandler();
  };

  //*--------------Renders total duration when audio is loaded-------------------
  const onLoadedMetadata = () => {
    const time = audioRef.current.duration;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - Math.floor(time / 60) * 60);
    const dur = `0${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`;
    setDuration(dur);
  };

  //*-----------------------CSS inline styles-----------------------------

  const width = {
    width: `${props.playLenght}%`,
  };
  const background = {
    backgroundImage: `linear-gradient(to right, ${props.currentSong.color[0]} , ${props.currentSong.color[1]})`,
  };
  const animation = { transform: `rotate(${rotation}deg)` };

  return (
    <div
      className={s.audio}
      onClick={() => {
        props.setCheck(false); //hides sidebar when click outside it
      }}
    >
      {/* ----------------Audio image and info------------- */}
      <img src={props.currentSong.cover} className={s.image} style={animation} />
      <div className={s.info}>
        <p className={s.song_name}>{props.currentSong.name}</p>
        <p className={s.artist}>{props.currentSong.artist}</p>
      </div>
      {/* ----------------Audio tag------------- */}
      <audio
        onLoadedMetadata={onLoadedMetadata}
        onPause={() => {
          props.setPlay(false);
        }}
        onPlay={() => {
          props.setPlay(true);
        }}
        onTimeUpdate={timeUpdateHandler}
        onEnded={setNextSong}
        ref={audioRef}
        src={props.currentSong.audio}
      />{" "}
      {/* ----------------Seek bar------------- */}
      <div className={s.timeline}>
        <p className={s.playing_time}>{playingTime}</p>
        <div className={s.time_track}>
          <div className={s.played_time} style={{ ...width, ...background }}></div>
          <input
            type="range"
            value={props.playLenght}
            onChange={durationChangeHandler}
            className={s.slider}
          />
        </div>
        <p className={s.duration}>{duration}</p>
      </div>
      {/* ----------------Set play speed------------- */}
      <div className={s.speed}>
        <SpeedButton function={setPlaybackRate} speed={0.5} />
        <SpeedButton function={setPlaybackRate} speed={1} />
        <SpeedButton function={setPlaybackRate} speed={1.5} />
        <SpeedButton function={setPlaybackRate} speed={2} />
      </div>
      {/* ----------------Audio controls------------- */}
      <div className={s.controls}>
        <Button
          icon={"fa-solid fa-rotate-right"}
          onclick={() => {
            audioRef.current.currentTime = 0;
            setRotation(0);
          }}
          className={s.reset_button}
        />
        <div className={s.main_controls}>
          
        <Button
          buttonRef={prevRef}
          icon="fa-solid fa-backward"
          onclick={setPrevSong}
          className={s.prev_button}
        />
        <Button
          icon={!props.play ? "fa-solid fa-play" : "fa-solid fa-pause"}
          onclick={!props.play ? playHandler : pauseHandler}
          className={s.play_button}
        />
        <Button
          buttonRef={nextRef}
          icon="fa-solid fa-forward"
          onclick={setNextSong}
          className={s.next_button}
        />
        </div>
        <div className={s.sound}>
          <Button
            icon={volume > 0 ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"}
            onclick={mute}
            className={s.volume_icon}
          />
          <input
            ref={soundRef}
            type="range"
            onChange={volumeChangeHandler}
            className={s.volume}
            value={audioRef?.current?.volume * 100}
          />
        </div>
      </div>
    </div>
  );
};

export default Audio;
