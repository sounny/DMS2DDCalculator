let current;

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

export function setupQuiz() {
  document.getElementById('random-dms').addEventListener('click', newQuestion);
}
