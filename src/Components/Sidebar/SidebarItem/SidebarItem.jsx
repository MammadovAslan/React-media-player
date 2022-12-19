import React from "react";
import s from "./SidebarItem.module.css";
const SidebarItem = (props) => {
  const clickHandler = () => {
    props.setPlay(props.play ? true : false);
    props.setPlayLength(0);
    const arr = props.playList.map((el) => {
      if (el.id === props.id) {
        el.active = true;
        props.setCurrentSong(el);
        return el;
      } else {
        el.active = false;
        return el;
      }
    });

    props.setPlayList(arr);
  };

  return (
    <li className={`${s.item} ${props.active}`} onClick={clickHandler} id={props.id}>
      <img src={props.song.cover} className={s.image} />
      <div className={s.info}>
        <p className={s.song_name}>{props.song.name}</p>
        <p className={s.artist}>{props.song.artist}</p>
      </div>
    </li>
  );
};

export default SidebarItem;
