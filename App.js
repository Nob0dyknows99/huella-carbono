import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import FormularioScreen from './screens/FormularioScreen';
import ResultadoScreen from './screens/ResultadoScreen';
import HistorialScreen from './screens/HistorialScreen';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemedViewProvider from './components/ThemedViewProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { dark } = useTheme();
  const isDark = dark;

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Formulario') iconName = 'document-text';
          else if (route.name === 'Historial') iconName = 'time';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff',
          borderTopColor: isDark ? '#333' : '#ccc',
        },
        tabBarActiveTintColor: isDark ? '#4CAF50' : '#2e7d32',
        tabBarInactiveTintColor: isDark ? '#888' : '#999',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Formulario" component={FormularioScreen} />
      <Tab.Screen name="Historial" component={HistorialScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedViewProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="Resultado" component={ResultadoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemedViewProvider>
    </ThemeProvider>
  );
}
