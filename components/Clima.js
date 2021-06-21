import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

const Clima = ({resultado, kelvin}) => {
  const {name, main, weather} = resultado;

  if (!name) return null;

  return (
    <View style={styles.clima}>
      <Text style={[styles.texto, styles.actual]}>
        {parseInt(main.temp - kelvin)}
        <Text style={styles.temperatura}> {' °C'} </Text>
        <Image
          style={{width: 66, height: 58}}
          source={{
            uri: `http://openweathermap.org/img/w/${weather[0].icon}.png`,
          }}
        />
      </Text>
      <View style={styles.temperaturas}>
        <Text style={styles.texto}>
          Min <Text>{parseInt(main.temp_min - kelvin)} C°</Text>
        </Text>
        <Text style={styles.texto}>
          Max <Text>{parseInt(main.temp_max - kelvin)} C°</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clima: {
    marginBottom: 20,
    color: 'black',
  },
  texto: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,

    marginRight: 20,
  },
  actual: {
    fontSize: 80,
    color: '#FFF',
    marginRight: 0,

    fontWeight: 'bold',
  },
  temperatura: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperaturas: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Clima;
