import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const [consultaAPI, consultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: '',
  });
  const [bgcolor, guardarBgColor] = useState('rgb(71, 149, 212)');
  const kelvin = 273.15;

  useEffect(() => {
    const buscarClima = async () => {
      if (consultaAPI) {
        const {ciudad, pais} = busqueda;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${'c3669a4d8c47d196ee45140586511a6f'}`;

        try {
          const response = await axios.get(url);

          guardarCargando(true);
          setTimeout(() => {
            guardarResultado(response.data);

            //MODIFICA COLOR DE FONDO SEGUN TEMP
            const {main} = response.data;
            const actual = parseFloat(main.temp - kelvin);

            if (actual < 10) {
              guardarBgColor('rgb(105, 108, 49)');
            } else if (actual >= 10 && actual < 25) {
              guardarBgColor('rgb(71, 149, 212)');
            } else {
              guardarBgColor('rgb(178, 28, 61)');
            }

            consultarAPI(false);
            guardarCargando(false);
          }, 2000);
        } catch (error) {
          mostrarAlerta(
            'Error',
            'No hay resultados',
            'Intenta con otra ciudad o pais',
          );
        }
      }
    };
    buscarClima();
  }, [consultaAPI]);

  const mostrarAlerta = (type, text, button) => {
    Alert.alert(type, text, [
      {
        text: button,
      },
    ]);
  };

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  const loader = cargando ? (
    <ActivityIndicator size="large" color="#000" />
  ) : null;

  const bgColorApp = {
    backgroundColor: bgcolor,
  };

  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <View>
            <Clima resultado={resultado} kelvin={kelvin} />
          </View>
          <Formulario
            busqueda={busqueda}
            guardarBusqueda={guardarBusqueda}
            consultarAPI={consultarAPI}
            mostrarAlerta={mostrarAlerta}
          />
        </View>
        <View style={{marginTop: 40}}>{loader}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,

    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
