import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId, startTime, onStartPlaying, onPlayed }) => {
  const playerRef = useRef(null);
  const [showButton, setShowButton] = useState(true);

  const handlePlay = () => {
    setShowButton(false); // Hide button
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    setShowButton(false)
    playerRef.current.seekTo(startTime);
    playerRef.current.playVideo();
    onStartPlaying()
  };

  const onPlay = () => {
    if (playerRef.current) {
        
      setTimeout(() => {
        playerRef.current.pauseVideo();
        onPlayed()
      }, 20000); // Pause after 20 seconds
    }
  };
  const options = {
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      disablekb: 1,
    },
  };
  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      {showButton && (
        <button
          onClick={() => {
            handlePlay();
            playerRef.current.playVideo();
          }}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            color: "white",
            backgroundColor: "red",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          Play
        </button>
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "60px", 
          backgroundColor: "#242424",
          zIndex: 5,
        }}
      />

      <YouTube id={videoId}
        style={{ display: showButton ? "none" : "" }}
        videoId={videoId}
        onReady={onReady}
        onPlay={onPlay}
        onStartPlaying={onStartPlaying}
        opts={options}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50px", 
          backgroundColor: "#242424",
          zIndex: 5,
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
