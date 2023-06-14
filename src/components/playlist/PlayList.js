import React, { useContext, useState } from "react";
import FileSaver from "file-saver";
import Popup from "reactjs-popup";
//import "reactjs-popup/dist/index.css";
//import { song_list } from "../../context/songs";
import playerContext from "../../context/playerContext";
import { Storage } from "aws-amplify";

let Playlist = () => {
  const { songslist, currentSong, SetCurrent, SetStart } =
    useContext(playerContext);

  async function saveTrack(keyPath, filename) {
    setProgressBar(0);
    setOpen((o) => !o);
    const result = await Storage.get(keyPath, {
      download: true,
      progressCallback,
    });
    FileSaver.saveAs(result.Body, filename);
    closeModal();
  }
  const progressCallback = (progress) => {
    const progressInPercentage = Math.round(
      (progress.loaded / progress.total) * 100
    );

    setProgressBar(progressInPercentage);

    console.log(`Progress: ${progressInPercentage}%`);
  };

  const backgroundStyle = {
    backgroundImage: `url(${songslist[0].cover290})`,
  };
  const [open, setOpen] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const closeModal = () => setOpen(false);
  const Modal = () => (
    <div>
      <Popup open={open}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          Downloading: {progressBar} %
        </div>
      </Popup>
    </div>
  );

  return (
    <div className="playlist">
      <ul className="loi">
        {songslist.map((song, i) => (
          <li
            className={"songContainer " + (currentSong === i ? "selected" : "")}
          >
            <div
              className="tmbn_song"
              style={backgroundStyle}
              key={i}
              onClick={() => {
                SetCurrent(i);
                SetStart(i);
              }}
            >
              <i className="fas fa-play"></i>
            </div>
            <div className="songmeta_playlist">
              <span className="songname">{song.title}</span>
              <span className="songauthors">{song.artistName}</span>
            </div>
            <div className="playlist_btns_group">
              <button className="fav_song playlist_btn">
                <i className="far fa-heart fa-lg"></i>
              </button>
              <button className="options_song playlist_btn">
                <i class="fas fa-ellipsis-v fa-lg"></i>
              </button>
            </div>
            <button
              className="fav_song playlist_btn"
              onClick={() =>
                saveTrack(
                  song.fileUrl.split("public/").pop(),
                  song.fileUrl.split("public/").pop()
                )
              }
            >
              <i className="far fa-arrow-alt-circle-down fa-lg"></i>
            </button>
            <Modal />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
