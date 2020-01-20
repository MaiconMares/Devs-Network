import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; //Icones do expo

import api from './../services/api';
import { connect, disconnect, subscribeToNewDevs } from './../services/socket';

function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

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

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs]);

    function setupWebsocket() {
        disconnect();

        const { latitude, longitude } = currentRegion;
        connect(
            latitude,
            longitude,
            techs,
        );
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        console.log('OK');
        const response = await api.get('/filter', {
            params: {
                latitude,
                longitude,
                techs,
            }
        });

        setDevs(response.data.devs);
        setupWebsocket();
    }

    function handleRegionChanged(region) {
        console.log(region);
        setCurrentRegion(region);
        /* Recebe region do <MapView> quando ha uma mudanca na localizacao e
           e atualiza seu novo estado */
    }

    if (!currentRegion) {
        return null;
    }

    return ( 
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged}
                style={styles.attributes} 
                initialRegion={currentRegion}>
                {devs.map(dev => (
                    <Marker 
                        key={dev._id}
                        coordinate={{
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1], 
                        }}>
                    <Image 
                        style={styles.avatar} 
                        source={{ uri: dev.avatar_url }}></Image>
                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_username: dev.github_username });
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                        </View>
                    </Callout>
                </Marker> 
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={text => setTechs(text)}>
                </TextInput>
                <TouchableOpacity onPress={() => {loadDevs()}} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff"/>
                </TouchableOpacity>
            </View>
        </>
    );
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
    }, 
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        color: '#333',
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            position: 'absolute',
            width: 4,
            height: 4,
        },
        elevation: 4, //Propriedade de sombra do React
    }, 
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
})

export default Main;