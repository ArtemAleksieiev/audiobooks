import React, { useReducer } from "react";
import playerContext from "./playerContext";
import playerReducer from "./playerReducer";
import { booklist } from "./songs";

const PlayerState = (props) => {
  //const product = products.find((product) => product.id === productId);
  const akniga = booklist.find(
    (akniga) => akniga.audiobook === props.trackList
  );

  const initialState = {
    currentSong: 0,
    startFirstTrack: -1,
    songslist: akniga.list,
    repeat: false,
    random: false,
    playing: false,
    audio: null,
  };
  console.log("Current tracklist: " + props.trackList);

  const [state, dispatch] = useReducer(playerReducer, initialState);
  //Set current song
  const SetCurrent = (id) => dispatch({ type: "SET_CURRENT_SONG", data: id });
  const SetStart = (id) => dispatch({ type: "SET_START_TRACK", data: id });
  //Set songs array
  const songsSet = (songsArr) =>
    dispatch({ type: "SET_SONGS_ARRAY", data: songsArr });

  // Prev song
  const prevSong = () => {
    if (state.random) {
      return SetCurrent(~~(Math.random() * state.songslist.length));
    }

    if (state.currentSong === 0) {
      return SetCurrent(state.songslist.length - 1);
    } else {
      return SetCurrent(state.currentSong - 1);
    }
  };
  // Next song
  const nextSong = () => {
    if (state.random) {
      return SetCurrent(~~(Math.random() * state.songslist.length));
    }
    if (state.currentSong === state.songslist.length - 1) {
      SetCurrent(0);
    } else {
      SetCurrent(state.currentSong + 1);
    }
  };
  //Set playing state
  const togglePlaying = () =>
    dispatch({ type: "TOGGLE_PLAYING", data: state.playing ? false : true });
  //Repeat and Random
  //Set playing state
  const toggleRepeat = (id) =>
    dispatch({ type: "TOGGLE_REPEAT", data: state.repeat ? false : true });
  //Set playing state
  const toggleRandom = () =>
    dispatch({ type: "TOGGLE_RANDOM", data: state.random ? false : true });
  //End of song
  const handleEnd = () => {
    // Check for random and repeat options
    if (state.random) {
      return SetCurrent(~~(Math.random() * state.songslist.length));
    } else {
      if (state.repeat) {
        nextSong();
      } else if (state.currentSong === state.songslist.length - 1) {
        return;
      } else {
        nextSong();
      }
    }
  };

  return (
    <playerContext.Provider
      value={{
        currentSong: state.currentSong,
        startFirstTrack: state.startFirstTrack,
        // songs: state.songs,
        songslist: state.songslist,
        repeat: state.repeat,
        random: state.random,
        playing: state.playing,
        audio: state.audio,
        SetCurrent,
        SetStart,
        prevSong,
        nextSong,
        toggleRandom,
        toggleRepeat,
        togglePlaying,
        handleEnd,
        songsSet,
      }}
    >
      {props.children}
    </playerContext.Provider>
  );
};
export default PlayerState;
