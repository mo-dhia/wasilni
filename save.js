  {/* <View style={{
                    width: '100%', height: '5%', flexDirection: 'row', justifyContent: 'center', gap: VW * 0.15,
                    marginTop: '7.5%',
                }}>
                    <View style={{ height: 50, width: 60, backgroundColor: '#0E887D', justifyContent: 'center', alignItems: 'center', borderRadius: VW * 0.05 }}>
                        <BusSVG width={50} height={50} />
                    </View>
                    <View style={{ height: 50, width: 60, backgroundColor: '#0E887D', justifyContent: 'center', alignItems: 'center', borderRadius: VW * 0.05 }}>
                        <TrainSVG width={50} height={50} />
                    </View>
                    <View style={{ height: 50, width: 60, backgroundColor: '#0E887D', justifyContent: 'center', alignItems: 'center', borderRadius: VW * 0.05 }}>
                        <MetroSVG width={50} height={50} />
                    </View>
                </View> */}








                  {/* <View style={{ marginTop: VH * 0.3, zIndex: 5 }}>
                {locations.map((e, i) => <Pressable key={i}
                    onPress={() => {
                        if (activeInput === 1) {
                            // setDeparture(e)
                            // console.log('fired')
                            // console.log(getNearbyStations(e.latitude, e.longitude, 2))

                            getNearbyStations(e.latitude, e.longitude, 1)
                               .then(stations => {
                                 console.log(`Found ${stations.length} nearby stations:`);
                                 setDeparture(stations)
                                 stations.forEach(station => {
                                   console.log(`- ${station.name} (Line ${station.lineNumber}, Station ${station.stationNumber}): ${station.distance.toFixed(2)} km`);
                                 });
                               }).catch(error => console.error('Error:', error));

                        } else if (activeInput === 2) {
                            // setDestination(e)

                        }
                    }
                    }
                    style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                    <Text>{e.name}</Text>
                </Pressable>)}
            </View > */}