import React, { useContext } from "react";
import playerContext from "../../context/playerContext";
const fav = () => {
  console.log("I like this one");
};

const Actions = () => {
  const { songslist } = useContext(playerContext);
  return (
    <div className="actions">
      <img src="https://audiobookbackend.s3.us-east-2.amazonaws.com/simenon/cover290.jpg" />
      <div className="album_meta">
        <span className="alb_label">AUDIOBOOK</span>
        <h1>{songslist[0].bookTitle}</h1>
      </div>
      <div className="action_btns">
        <button onClick={() => fav()} className="fav_btn">
          <i className="far fa-heart fa-2x"></i>
        </button>
        <button onClick={() => fav()} className="fav_btn">
          <i className="far fa-arrow-alt-circle-down fa-2x"></i>
        </button>
        <button onClick={() => fav()} className="fav_btn">
          <i className="fas fa-ellipsis-h fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default Actions;
