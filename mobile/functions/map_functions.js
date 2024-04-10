import axios from 'axios';

export const calculateRoute = async ( setRouteCoordinates, destination,  origin) => {
    if (origin && destination) {
      try {
        const apiKey = '5b3ce3597851110001cf62480feb1c0e25a64aaaba9799d6f5b6b28b'; // Provided API key
        const response = await axios.get(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`
        );
        const { features } = response.data;

        if (features.length > 0) {
          const coordinates = features[0].geometry.coordinates.map(
            (coordinate) => ({
              latitude: coordinate[1],
              longitude: coordinate[0],
            })
          );
          setRouteCoordinates(coordinates);
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    }
  };