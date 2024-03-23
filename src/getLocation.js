export async function initLocation () {
    try {
        let location = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                document.getElementById('loader').lastElementChild.innerText = "Obteniendo información con base en tu ubicación" 
                resolve(position)
                }, (error) => {
                    reject(error)
                })
        })
        return [location.coords.latitude, location.coords.longitude];
    }
    catch (error) {
        console.error(error)
        return null
    }
}