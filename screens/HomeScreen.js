import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { dark, toggleTheme } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (imageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [imageLoaded]);

  const backgroundStyle = dark ? styles.dark : styles.light;
  const textColor = dark ? styles.textLight : styles.textDark;

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.logoContainer}>
        {!imageLoaded && (
          <ActivityIndicator size="large" color="#22c55e" style={styles.loadingIndicator} />
        )}

        <Animated.Image
          source={require('../assets/eco-logo.png')}
          style={[styles.logo, { opacity: fadeAnim }]}
          resizeMode="contain"
          onLoadEnd={() => setImageLoaded(true)}
          defaultSource={Platform.OS === 'ios' ? require('../assets/eco-logo.png') : undefined}
        />

        <Text style={[styles.title, textColor]}>
          Calculadora de Huella ecológica
        </Text>
        <Text style={[styles.subtitle, textColor]}>
          Mide tu impacto ambiental y toma decisiones más sostenibles.
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.buttonPrimary, styles.shadow]}
          onPress={() => navigation.navigate('Formulario')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>🚀 Empezar Evaluación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonSecondary, styles.shadow]}
          onPress={() => navigation.navigate('Historial')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonSecondaryText}>📅 Historial de Huellas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTheme}>
          <Text style={[styles.toggleText, textColor]}>
            {dark ? '☀️ Cambiar a Claro' : '🌙 Cambiar a Oscuro'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  light: {
    backgroundColor: '#f0fdf4',
  },
  dark: {
    backgroundColor: '#0f172a',
  },
  textDark: {
    color: '#000000',
  },
  textLight: {
    color: '#ffffff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  loadingIndicator: {
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  buttons: {
    gap: 14,
    marginBottom: 30,
  },
  buttonPrimary: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonSecondary: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderColor: '#22c55e',
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 17,
  },

  buttonSecondaryText: {
    color: '#22c55e',
    fontWeight: '600',
    fontSize: 17,
  },
  toggleText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
