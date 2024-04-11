import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, getDocs } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyAg2XMiPGODvEwynHW3M_-bA3ACG07DmtE",
    authDomain: "wassilni-138b0.firebaseapp.com",
    projectId: "wassilni-138b0",
    storageBucket: "wassilni-138b0.appspot.com",
    messagingSenderId: "228820169436",
    appId: "1:228820169436:web:76933ae5c0d7cd8cfdba19"
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

export const getNearbyStations = (userLat, userLong, radiusInKm) => {
    async function getNearby(type) {
        const nearbyStations = [];

        const stationsCollectionRef = collection(db, 'stations');

        const tunisDocRef = doc(stationsCollectionRef, 'Tunis');

        const metrosCollectionRef = collection(tunisDocRef, type);
        const querySnapshot = await getDocs(metrosCollectionRef);
        querySnapshot.forEach((doc) => {
            const station = doc.data();

            const stationLat = station.location._lat;
            const stationLong = station.location._long;
            const distance = calculateDistance(userLat, userLong, stationLat, stationLong);
            if (distance <= radiusInKm) {
                nearbyStations.push({ ...station, distance, type });
            }
        });

        nearbyStations.sort((a, b) => a.distance - b.distance);

        return nearbyStations;
    }

    return {
        metro: () => getNearby('metro'),
        bus: () => getNearby('bus')
    }
}




