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
    } while (randomItem.videoId == null || playedSongs.includes(randomItem.videoId));
    let newSong = randomItem;
    setPlayedSongs([...playedSongs, newSong.videoId]);
    setCurrentSong(newSong);
  }
  function loadPlayList(path) {
    fetch(path)
    .then((r) => r.json())
    .then((r) => {
      setPlaylist(r);
      pickNextSong(r.songs);
    });
  }

  useEffect(() => {
    loadPlayList("./playlist-fr.json")
  }, []);

  return (
    <div>
      {!playlist && <span>Loading...</span>}
      {playlist && currentSong && (
        <div style={{width:"100%"}}>
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
      <div style={{margin: "150px"}}>
        Change the playlist to 
        <button onClick={() => loadPlayList("./playlist-en.json")}>English</button>
        <button onClick={() => loadPlayList("./playlist-fr.json")}>Français</button>
      </div>

    </div>
  );
}

export default App;
