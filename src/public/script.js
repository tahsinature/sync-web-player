// init
const player = new Plyr("video", {
  captions: { active: true },
  // thumbnail: {}, // to be added
});

const socket = io("http://localhost:3000");
io();

// Expose player so it can be used from the console
window.player = player;

// my logic
player.on("pause", () => {
  console.log("video paused");
  socket.emit("pause");
});

player.on("play", () => {
  console.log(player.currentTime);
  console.log("video plying");
  socket.emit("play", { currentSeekTime: player.currentTime });
});

function seek(time) {
  player.forward(-player.duration);
  player.forward(time);
}

// ===================

socket.on("play", async (data) => {
  const { currentSeekTime } = data;
  seek(currentSeekTime);
  await player.play();
});

socket.on("pause", async (data) => {
  await player.pause();
});
