import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistorialScreen() {
  const [historial, setHistorial] = useState([]);
  const { dark, toggleTheme } = useTheme();

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const data = await AsyncStorage.getItem('historial');
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) setHistorial(parsed);
        }
      } catch (error) {
        console.error('Error al cargar historial:', error);
      }
    };
    cargarHistorial();
  }, []);

  const borrarHistorial = () => {
    Alert.alert(
      '¿Borrar historial?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('historial');
            setHistorial([]);
          },
        },
      ]
    );
  };

  const safeNumber = (val) => (typeof val === 'number' && !isNaN(val) ? val : 0);
  const safeToFixed = (val, digits = 2) => safeNumber(val).toFixed(digits);

  const themeStyles = dark ? styles.dark : styles.light;
  const textColor = dark ? styles.textDark : styles.textLight;
  const cardStyle = dark ? styles.cardDark : styles.cardLight;

  return (
    <SafeAreaView style={[styles.container, themeStyles]}>
        <ScrollView contentContainerStyle={[styles.container, themeStyles]}>
        <View style={styles.header}>
            <Text style={[styles.title, textColor]}>📅 Historial de Evaluaciones</Text>
        </View>

        {historial.length === 0 ? (
            <Text style={[styles.emptyText, textColor]}>No hay registros aún.</Text>
        ) : (
            historial.map((item, index) => (
            <View key={index} style={[styles.card, cardStyle]}>
                <Text style={[styles.cardDate, textColor]}>
                📅 {format(new Date(item.fecha), 'dd/MM/yyyy HH:mm')}
                </Text>

                <Text style={[styles.item, { color: '#3b82f6' }]}>
                🚗 Transporte: {safeToFixed(item.transporte)} tCO₂e
                </Text>
                <Text style={[styles.item, { color: '#10b981' }]}>
                🔌 Energía: {safeToFixed(item.energia)} tCO₂e
                </Text>
                <Text style={[styles.item, { color: '#f59e0b' }]}>
                🥗 Dieta: {safeToFixed(item.alimentacion)} tCO₂e
                </Text>

                <Text style={[styles.total, { color: '#22c55e' }]}>
                🌍 Total: {safeToFixed(item.total)} tCO₂e
                </Text>
            </View>
            ))
        )}
        <View style={styles.deleteButton}>
            <Button title="🗑️ Borrar historial" color="red" onPress={borrarHistorial} />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  light: {
    backgroundColor: '#f8fafc',
  },
  dark: {
    backgroundColor: '#0f172a',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#0f172a',
  },
  textDark: {
    color: '#f8fafc',
  },
  deleteButton: {
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 32,
  },
  card: {
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  cardLight: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1,
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderWidth: 1,
  },
  cardDate: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    fontSize: 16,
    marginBottom: 4,
  },
  total: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 10,
  },
});
