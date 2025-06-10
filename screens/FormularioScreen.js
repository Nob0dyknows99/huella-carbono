import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import CustomSelect from '../components/CustomSelect';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FormularioScreen() {
  const { dark, toggleTheme } = useTheme();
  const navigation = useNavigation();

  const [transporteTipo, setTransporteTipo] = useState('auto_bencina');
  const [kmSemanales, setKmSemanales] = useState('');
  const [kwhMes, setKwhMes] = useState('');
  const [gasKgMes, setGasKgMes] = useState('');
  const [dieta, setDieta] = useState('omnivora');

  const handleCalcular = () => {
    const datos = {
      transporte: {
        tipo: transporteTipo,
        kmSemanales: parseFloat(kmSemanales),
      },
      energia: {
        kwhMes: parseFloat(kwhMes),
        gasKgMes: parseFloat(gasKgMes),
      },
      dieta,
    };
    navigation.navigate('Resultado', { datos });
  };

  const themeStyles = dark ? styles.dark : styles.light;
  const textColor = dark ? styles.textLight : styles.textDark;

  return (
    <SafeAreaView style={[styles.flex, themeStyles]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.flex, themeStyles]}
      >
        <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
          <View style={styles.header}>
            <Text style={[styles.title, textColor]}>🌍 Tu Huella de Carbono</Text>
            <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
              <Text style={styles.themeIcon}>{dark ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, dark ? styles.cardDark : styles.cardLight]}>
            <CustomSelect
              label="🚗 Tipo de transporte"
              selected={transporteTipo}
              onSelect={setTransporteTipo}
              options={[
                { label: 'Auto Bencina', value: 'auto_bencina' },
                { label: 'Auto Diésel', value: 'auto_diesel' },
                { label: 'Bus', value: 'bus' },
                { label: 'Metro', value: 'metro' },
              ]}
            />

            <LabeledInput
              label="🛣️ Km por semana"
              placeholder="Ej: 50"
              value={kmSemanales}
              onChangeText={setKmSemanales}
              keyboardType="numeric"
              dark={dark}
            />

            <LabeledInput
              label="⚡ Electricidad mensual (kWh)"
              placeholder="Ej: 120"
              value={kwhMes}
              onChangeText={setKwhMes}
              keyboardType="numeric"
              dark={dark}
            />

            <LabeledInput
              label="🔥 Gas mensual (kg)"
              placeholder="Ej: 15"
              value={gasKgMes}
              onChangeText={setGasKgMes}
              keyboardType="numeric"
              dark={dark}
            />

            <CustomSelect
              label="🥗 Tipo de dieta"
              selected={dieta}
              onSelect={setDieta}
              options={[
                { label: 'Omnívora', value: 'omnivora' },
                { label: 'Vegetariana', value: 'vegetariana' },
                { label: 'Vegana', value: 'vegana' },
              ]}
              style={{ marginTop: 20 }}
            />
          </View>

          <View style={[styles.buttonContainer, { marginBottom: 10 }]}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleCalcular}>
              <Text style={styles.buttonText}>🧮 Calcular Huella</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// COMPONENTE REUTILIZABLE
function LabeledInput({ label, placeholder, value, onChangeText, keyboardType, dark }) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[styles.label, dark ? styles.textLight : styles.textDark]}>{label}</Text>
      <TextInput
        style={[styles.input, dark && styles.inputDark]}
        placeholder={placeholder}
        placeholderTextColor={dark ? '#aaa' : '#888'}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  light: {
    backgroundColor: '#eefaf3',
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
    fontSize: 26,
    fontWeight: 'bold',
  },
  themeIcon: {
    fontSize: 22,
  },
  textLight: {
    color: '#ffffff',
  },
  textDark: {
    color: '#000000',
  },
  card: {
    padding: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 32,
  },
  cardLight: {
    backgroundColor: '#ffffff',
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
  },
  inputDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#555',
    color: '#fff',
  },
  buttonContainer: {
    gap: 18,
  },
  primaryButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  themeToggle: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
