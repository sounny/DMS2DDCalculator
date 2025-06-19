import { initMap, updateMarker, useMyLocation } from './map.js';
import { setupQuiz } from './quiz.js';

export function dmsToDd(deg, min, sec, hem) {
  const sign = hem === 'S' || hem === 'W' ? -1 : 1;
  return sign * (Number(deg) + Number(min) / 60 + Number(sec) / 3600);
}


function renderMath(latDegVal, latMinVal, latSecVal, latHemVal, lonDegVal, lonMinVal, lonSecVal, lonHemVal) {
  const latDD = dmsToDd(latDegVal, latMinVal, latSecVal, latHemVal);
  const lonDD = dmsToDd(lonDegVal, lonMinVal, lonSecVal, lonHemVal);
  mathDisplay.innerHTML =
    `Lat: ${latHemVal === 'S' ? '-' : ''}(${latDegVal} + ${latMinVal}/60 + ${latSecVal}/3600) = ${latDD.toFixed(6)}<br>` +
    `Lon: ${lonHemVal === 'W' ? '-' : ''}(${lonDegVal} + ${lonMinVal}/60 + ${lonSecVal}/3600) = ${lonDD.toFixed(6)}`;
}

const latDeg = document.getElementById('lat-deg');
const latMin = document.getElementById('lat-min');
const latSec = document.getElementById('lat-sec');
const latHem = document.getElementById('lat-hem');
const lonDeg = document.getElementById('lon-deg');
const lonMin = document.getElementById('lon-min');
const lonSec = document.getElementById('lon-sec');
const lonHem = document.getElementById('lon-hem');
const ddLat = document.getElementById('dd-lat');
const ddLon = document.getElementById('dd-lon');
const mathDisplay = document.getElementById('math-display');

function validateDms(deg, min, sec) {
  if (min < 0 || min >= 60) return false;
  if (sec < 0 || sec >= 60) return false;
  return true;
}

function updateFromDms() {
  const latValid = validateDms(+latDeg.value, +latMin.value, +latSec.value);
  const lonValid = validateDms(+lonDeg.value, +lonMin.value, +lonSec.value);
  document.getElementById('lat-error').textContent = latValid ? '' : 'Invalid';
  document.getElementById('lon-error').textContent = lonValid ? '' : 'Invalid';
  if (!latValid || !lonValid) return;
  const lat = dmsToDd(latDeg.value, latMin.value, latSec.value, latHem.value);
  const lon = dmsToDd(lonDeg.value, lonMin.value, lonSec.value, lonHem.value);
  ddLat.value = lat.toFixed(6);
  ddLon.value = lon.toFixed(6);
  renderMath(
    latDeg.value,
    latMin.value,
    latSec.value,
    latHem.value,
    lonDeg.value,
    lonMin.value,
    lonSec.value,
    lonHem.value
  );
  updateMarker(lat, lon, `${lat.toFixed(6)}, ${lon.toFixed(6)}`);
}

function attachEvents() {
  [latDeg, latMin, latSec, latHem, lonDeg, lonMin, lonSec, lonHem].forEach(el => {
    el.addEventListener('input', updateFromDms);
  });
  document.getElementById('show-map').addEventListener('click', () => {
    const lat = parseFloat(ddLat.value);
    const lon = parseFloat(ddLon.value);
    if (!isNaN(lat) && !isNaN(lon)) {
      updateMarker(lat, lon, `${lat.toFixed(6)}, ${lon.toFixed(6)}`);
    }
  });
  document.getElementById('locate').addEventListener('click', useMyLocation);
}

window.addEventListener('DOMContentLoaded', () => {
  initMap();
  attachEvents();
  setupQuiz();
    setInterval(() => {
      updateFromDms();
    }, 33);
});
