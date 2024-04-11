import { locations } from "../components/store"
import axios from 'axios';

const { activeInput, map } = locations

export const handleInput = (setInputRender, current, data, setState) => {
    activeInput.current = current
    setInputRender(p => !p)
    if (data) {
        const { latitude, longitude } = data
        map.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
        // setState(data)
    }
}



export const autocomplete = async (input, setSearch) => {
    try {
        const encodedInput = encodeURIComponent(input);
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodedInput}&format=json&addressdetails=1&polygon_geojson=0&countrycodes=TN&viewbox=10.0718,36.6507,10.3523,36.9168&limit=3`);
        const result = response.data.map(place => ({
            name: place.display_name,
            latitude: parseFloat(place.lat),
            longitude: parseFloat(place.lon),
        }))
        setSearch(result)
    } catch (error) {
        console.error('Error fetching autocomplete results:', error);
        setSearch([]);
    }
};