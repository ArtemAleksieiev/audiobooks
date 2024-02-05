import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Amplify } from "aws-amplify";
import "./index.css";
import Player from "./components/Player";
import Home from "./Home";
import VideoApp from "./VideoApp";

Amplify.configure({
  Auth: {
    identityPoolId: "us-east-2:731ea36d-2449-48ef-b636-bb0ebfdba6e6", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "us-east-2", // REQUIRED - Amazon Cognito Region
  },
  Storage: {
    AWSS3: {
      bucket: "audiobookbackend", //REQUIRED -  Amazon S3 bucket name
      region: "us-east-2", //OPTIONAL -  Amazon service region
    },
  },
});

const BookList = () => {
  /*const trackSrorage = Storage;
  trackSrorage
    .list("", { pageSize: "ALL" })
    .then(({ results }) => console.log(results))
    .catch((err) => console.log(err)); */

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoApp />} />
        {/*<Route index element={<Home />} />*/}
        <Route path="player/:tracks" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BookList />);
