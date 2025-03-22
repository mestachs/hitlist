import { useEffect, useState } from "react";
import "./App.css";
import YouTubePlayer from "./YoutubePlayer";
import SongQuestion from "./SongQuestion";

function App() {
  const [playlist, setPlaylist] = useState(undefined);
  const [currentSong, setCurrentSong] = useState([]);
  const [playedSongs, setPlayedSongs] = useState([]);

  const [showQuestion, setShowQuestion] = useState(false);

  function pickNextSong(mySongs) {
    let songs = mySongs || playlist.songs;
    let randomItem = undefined;
    do {
      randomItem = songs[Math.floor(Math.random() * songs.length)];
    } while (randomItem.videoId != null && playedSongs.includes(randomItem.videoId));
    let newSong = randomItem;
    setPlayedSongs([...playedSongs, newSong.videoId]);
    setCurrentSong(newSong);
  }

  useEffect(() => {
    fetch("./playlist.json")
      .then((r) => r.json())
      .then((r) => {
        setPlaylist(r);
        pickNextSong(r.songs);
      });
  }, []);

  return (
    <div>
      {!playlist && <span>Loading...</span>}
      {playlist && currentSong && (
        <div>
          <YouTubePlayer
            id={currentSong.videoId}
            videoId={currentSong.videoId}
            startTime={60}
            onPlayed={() => setCurrentSong(undefined)}
            onStartPlaying={() => setShowQuestion(true)}
          />
          {showQuestion && <SongQuestion song={currentSong} />}
        </div>
      )}
      <br></br>
      <br></br>

      {playlist && !currentSong && (
        <div>
          <button onClick={() => pickNextSong()}>Next</button>
        </div>
      )}
      {/*    <pre style={{ textAlign: "left" }}>
        {JSON.stringify(currentSong, undefined, 4)}
      </pre> */}
    </div>
  );
}

export default App;
