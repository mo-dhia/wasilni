import { initializeApp } from "firebase/app";
import { addDoc, collection, GeoPoint, doc, setDoc, getFirestore, getDocs } from 'firebase/firestore';
import fs, { stat } from 'fs';

// Read the JSON file synchronously
const data = JSON.parse(fs.readFileSync('./stations/stations.json', 'utf8'));
const stations = {}
stations.metro = data.metro.map(station => {
    return {
        N_de_la_ligne: station.properties["N°_de_la_ligne"],
        N_de_station: station.properties["N°_de_station"],
        Nom_de_station: station.properties["Nom_de_station"].includes('/') ? station.properties["Nom_de_station"].replace(/\//g, '_') : station.properties["Nom_de_station"],
        location: new GeoPoint(station.geometry.coordinates[1], station.geometry.coordinates[0])
    }
})
stations.bus = data.bus.map(station => {
    return {
        location: new GeoPoint(station.geometry.coordinates[1], station.geometry.coordinates[0]),
        N_de_la_ligne: station.properties["N°_de_la_ligne"].includes('/') ? station.properties["N°_de_la_ligne"].replace(/\//g, '_') : station.properties["N°_de_la_ligne"],
        N_de_station: station.properties["N°_de_station"],
        Nom_de_station: station.properties["Nom_de_station"].includes('/') ? station.properties["Nom_de_station"].replace(/\//g, '_') : station.properties["Nom_de_station"],
    }
})
// Convert the imported JSON data to an array

const firebaseConfig = {
    apiKey: "AIzaSyAhvmu_QEJ3cRwrA8v2l3MnPe68wzxJr20",
    authDomain: "wassilni-dd9d4.firebaseapp.com",
    projectId: "wassilni-dd9d4",
    storageBucket: "wassilni-dd9d4.appspot.com",
    messagingSenderId: "793814947931",
    appId: "1:793814947931:web:f40b7187508e11d60b877e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}



async function nearbyStations(userLat, userLong, radiusInKm, type) {
    const nearbyStations = [];
    // Reference to the "stations" collection
    const stationsCollectionRef = collection(db, 'stations');
    // Reference to the "Tunis" document within the "stations" collection
    const tunisDocRef = doc(stationsCollectionRef, 'Tunis');
    // Reference to the "metro" subcollection within the "Tunis" document
    const metrosCollectionRef = collection(tunisDocRef, 'bus');
    const querySnapshot = await getDocs(metrosCollectionRef);
    console.log(querySnapshot.size, stations.bus.length);
    querySnapshot.forEach((doc) => {
        const station = doc.data();
        // Access the latitude and longitude from the GeoPoint object
        const stationLat = station.location._lat;
        const stationLong = station.location._long;
        const distance = calculateDistance(userLat, userLong, stationLat, stationLong);
        if (distance <= radiusInKm) {
            nearbyStations.push({ ...station, distance, type });
        }
    });

    // Sort the stations by distance
    nearbyStations.sort((a, b) => a.distance - b.distance);
    return nearbyStations;
}
export const getNearbyStations = {
    bus: nearbyStations(userLat, userLong, radiusInKm, 'bus'),
    metro: nearbyStations(userLat, userLong, radiusInKm, 'metro')
}

