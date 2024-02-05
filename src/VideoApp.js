import "./video.css";
import VideoJS from "./VideoJS";
import video from "./video.mp4";

const VideoApp = () => {
  const videoJsOptions = {
    controls: true,
    sources: [
      {
        src: video,
        type: "video/mp4",
      },
    ],
  };

  return (
    <div className="app">
      <VideoJS options={videoJsOptions} />
    </div>
  );
};

export default VideoApp;
