/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useContext } from 'react';
import { Text, View, Button, StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SensorStoreContext } from './stores/SensorStore';
import { observer } from "mobx-react-lite";
import { SingleSensor } from "./ui/SingleSensor"

// @ts-ignore
import useSocket from 'use-socket.io-client';

//import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";

export const App = observer(() => {
  const [socket] = useSocket('ws://localhost:30000',
    {
      autoConnect: false,
      reconnect: false,
      transports: ['websocket'], upgrade: false
    })
  const sensoreStore = useContext(SensorStoreContext)

  //connect socket
  socket.connect();

  //add event
  socket.on('message', (msg: any) => {
    sensoreStore.name = msg.name;
    sensoreStore.value = msg.value;
    sensoreStore.timestamp = msg.timestamp;
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        < SingleSensor
          timestamp={sensoreStore.timestamp}
          name={sensoreStore.name}
          value={sensoreStore.value}
        />
      </View>

    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  wrapper: {
    width: "100%",
    maxWidth: 425,
    display: 'flex',
  }
});