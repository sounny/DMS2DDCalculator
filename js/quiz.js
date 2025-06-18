import { updateMarker } from './map.js';
import { dmsToDd } from './app.js';

let current, score = 0, count = 0;
const scoreEl = document.getElementById('score');

function randomCoord() {
  const latDeg = Math.floor(Math.random() * 90);
  const latMin = Math.floor(Math.random() * 60);
  const latSec = +(Math.random() * 60).toFixed(3);
  const latHem = Math.random() > 0.5 ? 'N' : 'S';

  const lonDeg = Math.floor(Math.random() * 180);
  const lonMin = Math.floor(Math.random() * 60);
  const lonSec = +(Math.random() * 60).toFixed(3);
  const lonHem = Math.random() > 0.5 ? 'E' : 'W';

  return { latDeg, latMin, latSec, latHem, lonDeg, lonMin, lonSec, lonHem };
}

export function newQuestion() {
  current = randomCoord();
  document.getElementById('lat-deg').value = current.latDeg;
  document.getElementById('lat-min').value = current.latMin;
  document.getElementById('lat-sec').value = current.latSec;
  document.getElementById('lat-hem').value = current.latHem;
  document.getElementById('lon-deg').value = current.lonDeg;
  document.getElementById('lon-min').value = current.lonMin;
  document.getElementById('lon-sec').value = current.lonSec;
  document.getElementById('lon-hem').value = current.lonHem;
}

export function checkAnswer(ddLat, ddLon) {
  const correct = dmsToDd(
    current.latDeg,
    current.latMin,
    current.latSec,
    current.latHem
  );
  const correctLon = dmsToDd(
    current.lonDeg,
    current.lonMin,
    current.lonSec,
    current.lonHem
  );
  const latOk = Math.abs(ddLat - correct) < 1e-6;
  const lonOk = Math.abs(ddLon - correctLon) < 1e-6;
  if (latOk && lonOk) {
    score++;
    updateMarker(ddLat, ddLon, 'Correct!');
  }
  count++;
  scoreEl.textContent = `${score} / ${count}`;
  if (count >= 5) {
    alert(`Quiz finished: ${score} of 5`);
    score = 0;
    count = 0;
  }
}

export function setupQuiz() {
  document.getElementById('random-dms').addEventListener('click', newQuestion);
  document.getElementById('check-answer').addEventListener('click', () => {
    const lat = parseFloat(document.getElementById('dd-lat').value);
    const lon = parseFloat(document.getElementById('dd-lon').value);
    if (!isNaN(lat) && !isNaN(lon)) {
      checkAnswer(lat, lon);
    }
  });
}
