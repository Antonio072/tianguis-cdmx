const API_URL = "https://api.tianguisdemexico.com/prod/v1/tianguis"
const API_NEAREST_URL = "https://api.tianguisdemexico.com/prod/v1/nearest-tianguis"
const DAY = "lunes"
const TOWNHALL = "tlalpan"


export async function getDataFromAPI(day=DAY, townhall=TOWNHALL) {
  console.log('GETTING DATA WITH: ', day, townhall, '...')
  try {
    let response = await fetch(`${API_URL}?days=[${day}]&townhall=${townhall}` );
    if (response.status !== 200) throw new Error("Error fetching data")
    else {
      response = await response.json();
      console.log('>RES', response);
      return response;
    }
  } catch (err) {
    console.log(">>ERROR", err);
  }
}

export async function getNearestTianguis(latitud, longitud){
  try {
    let response = await fetch(`${API_NEAREST_URL}?lat=${latitud}&long=${longitud}` );
    if (response.status !== 200) throw new Error("Error fetching data")
    else {
      response = await response.json();
      return response;
    }
  } catch (err) {
    console.log(">>ERROR", err);
  }
}