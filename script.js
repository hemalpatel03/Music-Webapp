const songs = [
    { title: "Sample Song 1", file: "song1.mp3" },
    { title: "Sample Song 2", file: "song2.mp3" },
    { title: "Sample Song 3", file: "song3.mp3" }
  ];
  
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("play-pause");
  const progress = document.getElementById("progress");
  const songTitle = document.getElementById("song-title");
  const songList = document.getElementById("songList");
  
  let isPlaying = false;
  
  // Load songs into list
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => loadSong(index);
    songList.appendChild(li);
  });
  
  function loadSong(index) {
    const selectedSong = songs[index];
    audio.src = selectedSong.file;
    songTitle.textContent = selectedSong.title;
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸️";
  }
  
  // Play/Pause toggle
  playPauseBtn.addEventListener("click", () => {
    if (!audio.src) return;
    if (isPlaying) {
      audio.pause();
      playPauseBtn.textContent = "▶️";
    } else {
      audio.play();
      playPauseBtn.textContent = "⏸️";
    }
    isPlaying = !isPlaying;
  });
  
  // Update progress bar
  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent || 0;
  });
  
  // Seek functionality
  progress.addEventListener("input", () => {
    const time = (progress.value / 100) * audio.duration;
    audio.currentTime = time;
  });
  