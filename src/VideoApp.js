import "./video.css";
import VideoJS from "./VideoJS";

const VideoApp = () => {
  const videoJsOptions = {
    controls: true,
    sources: [
      {
        src: "https://audiobookbackend.s3.us-east-2.amazonaws.com/public/video/video.mp4",
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
