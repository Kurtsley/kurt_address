// Brian Beard 2024

const form = document.querySelector("#address-form");
const container = document.querySelector(".container");
const addressInput = document.querySelector("#address");
const resultContent = document.querySelector(".result-content");
const resultAddress = document.querySelector("#address-result");
const resultCoord = document.querySelector("#coord-result");
const resultLink = document.querySelector("#map-link");
const resultExistText = document.querySelector("#exist-text");

clearResults();

const dataFunc = "showAddress";

function showAddress(data) {
  if (data.result.addressMatches.length > 0) {
    clearResults();
    console.log(resultExistText.textContent);
    const firstAddress = data.result.addressMatches[0];
    const matchedAddress = firstAddress.matchedAddress;
    const XCoord = firstAddress.coordinates.x;
    const YCoord = firstAddress.coordinates.y;
    const Coordinates = YCoord + "," + XCoord;
    const GOOGLE_URL =
      "https://www.google.com/maps/search/?api=1&query=" + Coordinates;
    resultContent.appendChild(resultAddress);
    resultContent.appendChild(resultCoord);
    resultContent.appendChild(resultLink);
    resultExistText.textContent = "EXISTS";
    resultExistText.style.color = "green";
    resultAddress.textContent = matchedAddress;
    resultCoord.textContent = Coordinates;
    resultLink.href = GOOGLE_URL;
    resultContent.style.display = "flex";
  } else {
    clearResults();
    existOnly();
    resultExistText.textContent = "NO MATCH";
    resultExistText.style.color = "red";
  }
}

function clearResults() {
  resultExistText.textContent = "";
  resultAddress.textContent = "";
  resultCoord.textContent = "";
  resultLink.href = "";
}

function existOnly() {
  resultContent.removeChild(resultAddress);
  resultContent.removeChild(resultCoord);
  resultContent.removeChild(resultLink);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const address = addressInput.value.trim();
  if (address) {
    const addressData = encodeURIComponent(address);
    const LOOKUP_URL =
      "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=" +
      addressData +
      "&benchmark=Public_AR_Current&format=jsonp&callback=" +
      dataFunc;

    const script = document.createElement("script");
    script.src = LOOKUP_URL;

    addressInput.value = "";

    document.body.appendChild(script);
  } else {
  }
});
