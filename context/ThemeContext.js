import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('temaOscuro');
      if (saved !== null) setDark(saved === 'true');
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const nuevoTema = !dark;
    setDark(nuevoTema);
    await AsyncStorage.setItem('temaOscuro', nuevoTema.toString());
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
