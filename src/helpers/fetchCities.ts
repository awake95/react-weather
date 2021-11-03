
export const fetchCities = async (value:string) => {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value ?? 'saint-petersburg'}&limit=5`;
    const requestHeaders: HeadersInit = new Headers();
    if (process.env.REACT_APP_RAPID_API) {
        requestHeaders.set('x-rapidapi-host', 'wft-geo-db.p.rapidapi.com');
        requestHeaders.set('x-rapidapi-key', process.env.REACT_APP_RAPID_API);
    }

    const fetchedData = fetch(url, {
        method: 'GET',
        headers: requestHeaders
    })

    return await fetchedData
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
}
