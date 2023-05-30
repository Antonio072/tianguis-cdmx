const API_URL = "https://gf888e5f6e.execute-api.us-east-1.amazonaws.com/tianguis"
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
