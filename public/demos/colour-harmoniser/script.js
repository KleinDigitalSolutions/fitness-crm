let dragging = false;
let startAngle = 0;
let pointerStartX = 0;
const dial = document.getElementById("dial");
const slider = document.getElementById("slider");

const colourDisplay = document.getElementById("colour-display");

function setHue(value) {
  // Wrap into [0, 360)
  let angle = Number(value) || 0;
  angle = ((angle % 360) + 360) % 360;
  slider.value = angle;
  dial.style.setProperty("--angle", `${angle}deg`);
  updateColourDisplay(angle);
}

// How many degrees per pixel of horizontal movement
const DEGREES_PER_PX = 2; // Adjust for sensitivity

dial.addEventListener("mousedown", (e) => {
  dragging = true;
  document.body.style.userSelect = "none";
  pointerStartX = e.clientX;
  startAngle = parseFloat(slider.value) || 0;
});
dial.addEventListener("touchstart", (e) => {
  dragging = true;
  document.body.style.userSelect = "none";
  pointerStartX = e.touches[0].clientX;
  startAngle = parseFloat(slider.value) || 0;
});

window.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const deltaX = e.clientX - pointerStartX;
  let newAngle = startAngle + deltaX * DEGREES_PER_PX;
  setHue(newAngle);
});
window.addEventListener("touchmove", (e) => {
  if (!dragging) return;
  const deltaX = e.touches[0].clientX - pointerStartX;
  let newAngle = startAngle + deltaX * DEGREES_PER_PX;
  setHue(newAngle);
});

window.addEventListener("mouseup", () => {
  dragging = false;
  document.body.style.userSelect = "";
});
window.addEventListener("touchend", () => {
  dragging = false;
  document.body.style.userSelect = "";
});

slider.addEventListener("input", (event) => {
  setHue(event.target.value);
});

function setHarmonyType(type) {
  const screen = document.getElementById("screen");
  screen.setAttribute("data-harmony", type);
}

function updateColourDisplay(hueVal) {
  const sliderVal = parseFloat(hueVal) || 0;
  const colour = `oklch(50% 0.2 ${sliderVal})`;
  colourDisplay.style.setProperty("--colour", colour);
  //document root
  document.documentElement.style.setProperty("--selected-colour", colour);
}

function reset() {
  // Stop any ongoing drag and clear selection lock
  dragging = false;
  document.body.style.userSelect = "";
  setHue(0);
}
