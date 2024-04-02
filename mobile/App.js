import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import ORSMap from './ORSMap';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const { width: vw, height: vh } = Dimensions.get('window')

  return (
    <View style={{ flex: 1, backgroundColor: 'gray', display: 'flex', justifyContent: 'flex-end' }}>
      <ORSMap />

      <View style={{ width: '100%', height: '25%', backgroundColor: '#625ffe', borderTopLeftRadius: parseInt('45%'), borderTopRightRadius: parseInt('45%'), display: 'flex', justifyContent: 'flex-end', position: 'absolute' }}>
        <LinearGradient
          colors={['rgba(98, 95, 254, 0)', 'rgba(255, 255, 255, 0.25)']}
          locations={[0.6, 1]}
          start={{ x: 1.4, y: 1 }} // Bottom-right corner
          end={{ x: 0, y: 0 }}   // Top-left corner
          style={{ width: '50%', height: '100%', position: 'absolute', borderTopLeftRadius: parseInt('45%') }}
        />
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: vw * 0.02, alignItems: 'center', justifyContent:'center' }}>
            <Image style={{ height: vw * 0.065, width: vw * 0.065 }} src='https://media.discordapp.net/attachments/1224744152214802525/1224852698495586434/image.webp?ex=661efff7&is=660c8af7&hm=26a2e4d5bb110d58645a03f2aa36165445d85385c0fb747afc4f9121e229549c&=&format=webp' />
            <Text style={{ color: '#9a98fe', fontSize: vw * 0.0425 }}>Search destination...</Text>
          </View>
        </View>
        <View style={{ width: '100%', height: '50%', backgroundColor: '#ddddfd', borderTopLeftRadius: parseInt('60%'), borderTopRightRadius: parseInt('60%'), }}>
        </View>
      </View>
    </View>
  );
}


