import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResultadoScreen() {
  const route = useRoute();
  const { datos } = route.params || {};
  const { dark } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  if (!datos) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No hay datos para mostrar.</Text>
      </View>
    );
  }

  const safeNumber = (val) => (typeof val === 'number' && !isNaN(val) ? val : 0);
  const safeToFixed = (val, digits = 2) => safeNumber(val).toFixed(digits);

  const huellaTransporte = safeNumber(datos.transporte.kmSemanales) * 0.19 * 4;
  const huellaEnergia = safeNumber(datos.energia.kwhMes) * 0.38 + safeNumber(datos.energia.gasKgMes) * 2.75;
  const huellaDieta = {
    omnivora: 3.3,
    vegetariana: 1.7,
    vegana: 1.5,
  }[datos.dieta] || 3.3;

  const totalHuella = huellaTransporte + huellaEnergia + huellaDieta;

  const chartData = {
    labels: ['Transporte', 'Energía', 'Dieta'],
    datasets: [
      {
        data: [huellaTransporte, huellaEnergia, huellaDieta],
      },
    ],
  };

  useEffect(() => {
    const guardarHistorial = async () => {
      try {
        const nuevoRegistro = {
          id: uuid.v4(),
          fecha: new Date().toISOString(),
          transporte: huellaTransporte,
          energia: huellaEnergia,
          alimentacion: huellaDieta,
          total: totalHuella,
        };
        const historialActual = await AsyncStorage.getItem('historial');
        const historial = historialActual ? JSON.parse(historialActual) : [];
        historial.push(nuevoRegistro);
        await AsyncStorage.setItem('historial', JSON.stringify(historial));
      } catch (error) {
        console.error('Error guardando historial:', error);
      }
    };

    guardarHistorial();
  }, []);

  return (
    <SafeAreaView style={[styles.container, dark ? styles.dark : styles.light]}>
      <ScrollView style={styles.scroll}>
        <Text style={[styles.title, dark ? styles.textLight : styles.textDark]}>
          🌱 Tu Huella de Carbono
        </Text>

        <Text style={[styles.total, dark ? styles.textLight : styles.textDark]}>
          Total estimado: <Text style={styles.highlight}>{safeToFixed(totalHuella)} toneladas CO₂/año</Text>
        </Text>

        <View style={styles.summaryContainer}>
          <Text style={styles.category}>🚗 Transporte: {safeToFixed(huellaTransporte)} t CO₂</Text>
          <Text style={styles.category}>💡 Energía: {safeToFixed(huellaEnergia)} t CO₂</Text>
          <Text style={styles.category}>🥗 Dieta: {safeToFixed(huellaDieta)} t CO₂</Text>
        </View>

        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={250}
          yAxisSuffix=" t"
          fromZero
          chartConfig={{
            backgroundColor: dark ? '#121212' : '#ffffff',
            backgroundGradientFrom: dark ? '#121212' : '#e0f2f1',
            backgroundGradientTo: dark ? '#121212' : '#b2dfdb',
            decimalPlaces: 2,
            color: (opacity = 1) => dark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 100, 0, ${opacity})`,
            labelColor: (opacity = 1) => dark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
            propsForLabels: {
              fontSize: 12,
              fontWeight: '600',
            },
            propsForVerticalLabels: {
              rotation: 0,
            },
            propsForBackgroundLines: {
              stroke: dark ? '#444' : '#ccc',
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: dark ? '#ffffff' : '#2e7d32',
            },
          }}
          style={styles.chart}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
  },
  light: {
    backgroundColor: '#ffffff',
  },
  dark: {
    backgroundColor: '#121212',
  },
  textLight: {
    color: '#ffffff',
  },
  textDark: {
    color: '#000000',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 50,
    textAlign: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 30,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
    color: '#2e7d32',
  },
  summaryContainer: {
    marginBottom: 30,
    padding: 12,
    backgroundColor: '#f1f8e9',
    borderRadius: 10,
  },
  category: {
    fontSize: 16,
    marginBottom: 6,
  },
  chart: {
    borderRadius: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
