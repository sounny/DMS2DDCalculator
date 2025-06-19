let map, marker;

export function initMap() {
  map = L.map('map').setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  marker = L.marker([0, 0]).addTo(map);
}

export function updateMarker(lat, lon, text = '') {
  if (!map) return;
  marker.setLatLng([lat, lon]).bindPopup(text).openPopup();
  map.setView([lat, lon], 8);
}

export function useMyLocation(callback) {
  if (!navigator.geolocation) {
    alert('Geolocation not supported');
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    updateMarker(latitude, longitude, 'Your location');
    if (typeof callback === 'function') {
      callback(latitude, longitude);
    }
  });
}
