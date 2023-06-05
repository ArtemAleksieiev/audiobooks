import React from "react";

import "./main.css";
import "./input.css";
import Header from "./Header";
import Actions from "./playlist/Actions";
import PlayList from "./playlist/PlayList";
import PlayerState from "../context/playerState";
import Controls from "./Controls";
let Player = () => {
  return (
    <PlayerState>
      <div className="audioplayer">
        <div className="inside_content">
          <Header />
          <Actions />
          <PlayList />
        </div>
        <Controls />
      </div>
    </PlayerState>
  );
};

export default Player;
