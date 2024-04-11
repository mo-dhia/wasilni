import { getNearbyStations } from "@/functions/server/firebase";

export async function GET(_, parameter) {
    try {
        const params = parameter.params.nearby
        const [stationType, latitude, longitude] = params

        const stations = await getNearbyStations(latitude, longitude, 1)[stationType]()
        return new Response(JSON.stringify(stations));
    } catch (error) {
        console.error('Error:', error);
        return new Response(error, { status: 500 });
    }
}