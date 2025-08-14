import { initMap, updateMarker, useMyLocation } from './map.js';
import { setupQuiz } from './quiz.js';

export function dmsToDd(deg, min, sec, hem) {
  const sign = hem === 'S' || hem === 'W' ? -1 : 1;
  return sign * (Number(deg) + Number(min) / 60 + Number(sec) / 3600);
}

export function ddToDms(value, isLat) {
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = ((minFloat - min) * 60).toFixed(3);
  const hem = isLat ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
  return { deg, min, sec, hem };
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

function fillInputsFromDd(lat, lon) {
  const latParts = ddToDms(lat, true);
  const lonParts = ddToDms(lon, false);
  latDeg.value = latParts.deg;
  latMin.value = latParts.min;
  latSec.value = latParts.sec;
  latHem.value = latParts.hem;
  lonDeg.value = lonParts.deg;
  lonMin.value = lonParts.min;
  lonSec.value = lonParts.sec;
  lonHem.value = lonParts.hem;
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
}

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

function randomDms() {
  const lat = Math.random() * 180 - 90;
  const lon = Math.random() * 360 - 180;
  fillInputsFromDd(lat, lon);
  updateMarker(lat, lon, `${lat.toFixed(6)}, ${lon.toFixed(6)}`);
}

async function searchLocation() {
  const query = prompt('Enter place or address:');
  if (!query) return;
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.length) {
      alert('No results found');
      return;
    }
    const { lat, lon, display_name } = data[0];
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    fillInputsFromDd(latitude, longitude);
    updateMarker(latitude, longitude, display_name);
  } catch {
    alert('Search failed');
  }
}

function attachEvents() {
  [latDeg, latMin, latSec, latHem, lonDeg, lonMin, lonSec, lonHem].forEach(el => {
    el.addEventListener('input', updateFromDms);
  });
  document.getElementById('locate').addEventListener('click', () => {
    useMyLocation(fillInputsFromDd);
  });
  document.getElementById('random-dms').addEventListener('click', randomDms);
  document.getElementById('search-location').addEventListener('click', searchLocation);
}

window.addEventListener('DOMContentLoaded', () => {
  initMap();
  attachEvents();
  setupQuiz();
    setInterval(() => {
      updateFromDms();
    }, 33);
});
