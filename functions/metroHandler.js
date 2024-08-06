import geohash from "ngeohash";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import { db } from "./firebase.js";

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function distanceBetween(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function getGeohashRange(latitude, longitude, radiusInKm) {
  const lat = 0.0144927536231884; // degrees latitude per mile
  const lon = 0.0181818181818182; // degrees longitude per mile

  const lowerLat = latitude - (lat * radiusInKm) / 1.60934;
  const lowerLon = longitude - (lon * radiusInKm) / 1.60934;

  const upperLat = latitude + (lat * radiusInKm) / 1.60934;
  const upperLon = longitude + (lon * radiusInKm) / 1.60934;

  const lower = geohash.encode(lowerLat, lowerLon, 4); // Use precision 4 for a wider area
  const upper = geohash.encode(upperLat, upperLon, 4);

  return {
    lower,
    upper,
  };
}

export async function getNearbyStations(lat, lon, radiusInKm) {
  try {
    const range = getGeohashRange(lat, lon, radiusInKm);
    console.log("Querying geohash range:", range);

    const metroRef = collection(db, "metro");
    const q = query(
      metroRef,
      orderBy("geohash"),
      where("geohash", ">=", range.lower),
      where("geohash", "<=", range.upper + "\uf8ff")
    );

    const snapshot = await getDocs(q);

    const nearbyStations = [];
    // let fetchedDocs = snapshot.size;

    snapshot.forEach((doc) => {
      const station = doc.data();
      const stationLat = station.coordinates.latitude;
      const stationLon = station.coordinates.longitude;

      const distance = distanceBetween(lat, lon, stationLat, stationLon);

      if (distance <= radiusInKm) {
        nearbyStations.push({
          id: doc.id,
          name: station.station_name,
          lineNumber: station.line_number,
          stationNumber: station.station_number,
          coordinates: {
            latitude: stationLat,
            longitude: stationLon,
          },
          distance: distance,
        });
      }
    });

    console.log(
      `Fetched ${snapshot.size} documents, found ${nearbyStations.length} nearby stations`
    );

    return nearbyStations.sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error("Error getting nearby stations:", error);
    throw error;
  }
}

// Example call
 getNearbyStations(36.853885, 10.255016, 6)
   .then(stations => {
     console.log(`Found ${stations.length} nearby stations:`);
     stations.forEach(station => {
       console.log(`- ${station.name} (Line ${station.lineNumber}, Station ${station.stationNumber}): ${station.distance.toFixed(2)} km`);
     });
   })
   .catch(error => console.error('Error:', error));

export async function getStationsByLine(lineNumber) {
  try {
    // Reference to the Firestore collection
    const metroRef = collection(db, "metro");

    // Create a query to get stations for the specified line number
    const q = query(metroRef, where("line_number", "==", lineNumber));

    // Get documents that match the query
    const snapshot = await getDocs(q);

    // Array to hold all stations in the specified line
    const stationsInLine = [];

    // Iterate through each document in the snapshot
    snapshot.forEach((doc) => {
      const station = doc.data();
      const stationLat = station.coordinates.latitude;
      const stationLon = station.coordinates.longitude;

      stationsInLine.push({
        id: doc.id,
        name: station.station_name,
        lineNumber: station.line_number,
        stationNumber: station.station_number,
        coordinates: {
          latitude: stationLat,
          longitude: stationLon,
        },
      });
    });

    console.log(
      `Fetched ${stationsInLine.length} stations in line ${lineNumber}`
    );
    return stationsInLine;
  } catch (error) {
    console.error(`Error getting stations in line ${lineNumber}:`, error);
    throw error;
  }
}

export function orderStationsByNumber(stations, departureStationNumber) {
  try {
    // Filter stations to only include those starting from the departure station number
    const filteredStations = stations.filter(
      (station) => station.stationNumber >= departureStationNumber
    );

    // Sort the filtered stations by stationNumber in ascending order
    filteredStations.sort((a, b) => a.stationNumber - b.stationNumber);

    console.log(
      `Ordered ${filteredStations.length} stations starting from station ${departureStationNumber}`
    );
    return filteredStations;
  } catch (error) {
    console.error(`Error ordering stations by number:`, error);
    throw error;
  }
}

async function processStationsByLine(lineNumber, departureStationNumber) {
  try {
    // Get stations for the line
    const stations = await getStationsByLine(lineNumber);

    // Order the stations starting from the departure station
    const orderedStations = orderStationsByNumber(
      stations,
      departureStationNumber
    );

    console.log(
      "Ordered Stations:",
      "there are ",
      orderedStations.length,
      orderedStations
    );
  } catch (error) {
    console.error("Error processing stations:", error);
  }
}

// Example call
// const lineNumber = 1;
// const departureStationNumber = 5;
// processStationsByLine(lineNumber, departureStationNumber);

export async function getAllMetroStations() {
  try {
    // Reference to the Firestore collection
    const metroRef = collection(db, "metro");

    // Get all documents in the collection
    const snapshot = await getDocs(metroRef);

    // Array to hold all stations
    const allStations = [];

    // Iterate through each document in the snapshot
    snapshot.forEach((doc) => {
      const station = doc.data();
      const stationLat = station.coordinates.latitude;
      const stationLon = station.coordinates.longitude;

      allStations.push({
        id: doc.id,
        name: station.station_name,
        lineNumber: station.line_number,
        stationNumber: station.station_number,
        coordinates: {
          latitude: stationLat,
          longitude: stationLon,
        },
      });
    });
    
    console.log(`Fetched ${allStations.length} metro stations`);
    return allStations;
  } catch (error) {
    console.error("Error getting all metro stations:", error);
    throw error;
  }
}
