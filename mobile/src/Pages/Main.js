import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { StyleSheet, Image, View, Text } from 'react-native';

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            //Pede permissao para acessar localizacao do usuario

            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
                /* Se o usuario permitir o acesso a localizacao as 
                   coordenadas sao capturadas. 
                */
            }
        }

        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return ( 
        <MapView style={styles.attributes} initialRegion={currentRegion}>
            <Marker coordinate={{ latitude: -15.6480925, longitude: -47.8271517}}>
                <Image style={styles.avatar} source={ {uri: 'https://avatars3.githubusercontent.com/u/47460478?s=460&v=4'}}></Image>
                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: 'MaiconMares' });
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Maicon Mares</Text>
                        <Text style={styles.devBio}>I'm passionate about all things involving Tech.</Text>
                        <Text style={styles.devTechs}>Javascript, HTML, CSS, Node.js, React Native, React JS, C++, Python</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    attributes: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#fff',
    }, 
    callout: {
        width: 260,
    }, 
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devTechs: {
        marginTop: 5,
    }
})

export default Main;