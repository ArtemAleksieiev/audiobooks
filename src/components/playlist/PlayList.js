import React, { useContext } from "react";
import FileSaver from "file-saver";
//import { song_list } from "../../context/songs";
import playerContext from "../../context/playerContext";
import { Storage } from "aws-amplify";

let Playlist = () => {
  const { songslist, currentSong, SetCurrent, SetStart } =
    useContext(playerContext);

  async function saveTrack(keyPath, filename) {
    const result = await Storage.get(keyPath, {
      download: true,
      progressCallback(progress) {
        console.log(`Downloaded: ${progress.loaded}/${progress.total}`);
      },
    });
    FileSaver.saveAs(result.Body, filename);
  }

  const backgroundStyle = {
    backgroundImage: `url(${songslist[0].cover290})`,
  };
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
