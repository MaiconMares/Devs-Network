import React from 'react';
import { YellowBox, StyleSheet, Text, View, StatusBar } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);
//Faz com que a mensagem de erro que começa com Unrecognized WebSocket seja ignorada

export default function App() {
  return (
    <>
      <StatusBar/>
      <Routes/>
    </>
  );
}