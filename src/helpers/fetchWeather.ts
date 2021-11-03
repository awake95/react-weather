interface fetchWeatherParamsInterface {
    city: string;
}

export const fetchWeather = async (api:string, params?:fetchWeatherParamsInterface) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api}&q=${params?.city ?? 'Saint-Petersburg'}&days=3&aqi=no&alerts=no`;
    const fetchedData = fetch(url, {method: 'GET'})

    return await fetchedData
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
}
