import { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function ResultadoScreen() {
  const route = useRoute();
  const { resultado } = route.params || {};
  const { dark } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  if (!resultado) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No hay datos para mostrar.</Text>
      </View>
    );
  }

  const safeNumber = (val) => (typeof val === 'number' && !isNaN(val) ? val : 0);
  const safeToFixed = (val, digits = 2) => safeNumber(val).toFixed(digits);

  const huellaTransporte = safeNumber(resultado.transporte);
  const huellaEnergia = safeNumber(resultado.energia);
  const huellaDieta = safeNumber(resultado.alimentacion);
  const huellaConsumo = safeNumber(resultado.consumo);
  const huellaResiduos = safeNumber(resultado.residuos);
  const huellaVivienda = safeNumber(resultado.vivienda);
  const totalHuella = safeNumber(resultado.total);

  const biocapacidadPromedio = 1.6;
  const promedioChile = 3.3;
  const diferencia = totalHuella - biocapacidadPromedio;

  const chartData = {
    labels: ['🚗', '💡', '🥗', '🛍️', '♻️', '🏠'],
    datasets: [
      {
        data: [
          huellaTransporte,
          huellaEnergia,
          huellaDieta,
          huellaConsumo,
          huellaResiduos,
          huellaVivienda,
        ],
      },
    ],
  };

  return (
    <SafeAreaView style={[styles.container, dark ? styles.dark : styles.light]}>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
          <Text style={{ color: dark ? '#90caf9' : '#1565c0', fontSize: 16 }}>← Volver</Text>
        </TouchableOpacity>

        <Text style={[styles.title, dark ? styles.textLight : styles.textDark]}>
          🌱 Tu Huella Ecológica
        </Text>

        <Text style={[styles.total, dark ? styles.textLight : styles.textDark]}>
          Total estimado:{' '}
          <Text style={styles.highlight}>{safeToFixed(totalHuella)} gha/año</Text>
        </Text>

        <Text style={[styles.subText, dark ? styles.textLight : styles.textDark]}>
          🌍 Biocapacidad sostenible: <Text style={styles.bold}>1.6 gha/persona/año</Text>
        </Text>

        <Text style={[styles.subText, dark ? styles.textLight : styles.textDark]}>
          🇨🇱 Promedio nacional en Chile: <Text style={styles.bold}>3.3 gha/persona/año</Text>
        </Text>

        <Text style={[styles.subText, dark ? styles.textLight : styles.textDark]}>
          {diferencia > 0
            ? `⚠️ Excedes el límite sostenible por ${safeToFixed(diferencia)} gha.`
            : `✅ Estás dentro del límite sostenible.`}
        </Text>

        <View style={styles.summaryContainer}>
          <Text style={styles.category}>🚗 Transporte: {safeToFixed(huellaTransporte)} gha</Text>
          <Text style={styles.category}>💡 Energía: {safeToFixed(huellaEnergia)} gha</Text>
          <Text style={styles.category}>🥗 Dieta: {safeToFixed(huellaDieta)} gha</Text>
          <Text style={styles.category}>🛍️ Consumo: {safeToFixed(huellaConsumo)} gha</Text>
          <Text style={styles.category}>♻️ Residuos: {safeToFixed(huellaResiduos)} gha</Text>
          <Text style={styles.category}>🏠 Vivienda: {safeToFixed(huellaVivienda)} gha</Text>
        </View>

        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={260}
          yAxisSuffix=" gha"
          fromZero
          chartConfig={{
            backgroundColor: dark ? '#121212' : '#ffffff',
            backgroundGradientFrom: dark ? '#121212' : '#e0f2f1',
            backgroundGradientTo: dark ? '#121212' : '#b2dfdb',
            decimalPlaces: 2,
            color: (opacity = 1) => dark
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 100, 0, ${opacity})`,
            labelColor: (opacity = 1) => dark
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`,
            propsForLabels: {
              fontSize: 11,
              fontWeight: '600',
            },
            propsForBackgroundLines: {
              stroke: dark ? '#444' : '#ccc',
            },
          }}
          style={styles.chart}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16 },
  light: { backgroundColor: '#ffffff' },
  dark: { backgroundColor: '#121212' },
  textLight: { color: '#ffffff' },
  textDark: { color: '#000000' },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  highlight: {
    fontWeight: '700',
    color: '#2e7d32',
  },
  summaryContainer: {
    marginTop: 20,
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
    marginTop: 10,
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
