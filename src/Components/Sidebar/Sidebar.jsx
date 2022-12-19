import React from "react";
import SidebarItem from "./SidebarItem/SidebarItem";
import s from "./Sidebar.module.css";

const Sidebar = (props) => {
  return (
    <div className={s.sidebar}>
      <input
        type="checkbox"
        id="checkbox"
        className={s.input}
        checked={props.check}
        onChange={(e) => props.setCheck(e.target.checked)}
      />
      <label htmlFor="checkbox" className={s.toggle}>
        Library<i className="fa-brands fa-itunes-note"></i>
      </label>

      <ul className={s.sidebar_box}>
        <div className={s.header}>
          <h3 className={s.title}>Library</h3>
        </div>
        {props.playList.map((song, id) => {
          return (
            <SidebarItem
              song={song}
              key={id}
              active={song.active && s.active}
              id={song.id}
              playList={props.playList}
              setPlayList={props.setPlayList}
              setPlay={props.setPlay}
              play={props.play}
              setPlayLength={props.setPlayLength}
              currentSong={props.currentSong}
              setCurrentSong={props.setCurrentSong}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
