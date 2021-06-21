import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Formulario = ({
  busqueda,
  guardarBusqueda,
  consultarAPI,
  mostrarAlerta,
}) => {
  const {pais, ciudad} = busqueda;

  const [animacionBoton] = useState(new Animated.Value(1));

  const buscarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '') {
      mostrarAlerta('Error', 'Todos los campos son obligatorios', 'Entendido');
      return;
    }
    consultarAPI(true);
  };

  const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 30,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionBoton}],
  };

  return (
    <View>
      <View>
        <TextInput
          value={ciudad}
          style={styles.input}
          onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
          placeholder="Ciudad"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.input}>
        <Picker
          itemStyle={{height: 120, backgroundColor: '#FFF'}}
          selectedValue={pais}
          onValueChange={pais => guardarBusqueda({...busqueda, pais})}>
          <Picker.Item label="Seleccione un país" value="" />
          <Picker.Item label="Argentina" value="AR" />
          <Picker.Item label="Estados Unidos" value="US" />
          <Picker.Item label="Mexico" value="MX" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="Costa Rica" value="CR" />
          <Picker.Item label="España" value="ES" />
          <Picker.Item label="Peru" value="PE" />
        </Picker>
      </View>

      <TouchableWithoutFeedback
        onPressIn={() => animacionEntrada()}
        onPressOut={() => animacionSalida()}
        onPress={() => buscarClima()}>
        <Animated.View style={[styles.btnbuscar, estiloAnimacion]}>
          <Text style={styles.textobuscar}>Buscar clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 80,
    backgroundColor: 'white',
    fontSize: 35,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  btnbuscar: {
    backgroundColor: '#000',
    padding: 10,
    marginTop: 50,
    justifyContent: 'center',
  },
  textobuscar: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
