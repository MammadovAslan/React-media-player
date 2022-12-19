import React from "react";
import s from "./SpeedButton.module.css";

const SpeedButton = (props) => {
  return (
    <button onClick={() => props.function(props.speed)} className={s.speed_button}>
      x{props.speed}
    </button>
  );
};

export default SpeedButton;
