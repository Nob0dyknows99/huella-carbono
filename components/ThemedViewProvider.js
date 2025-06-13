import { View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemedViewProvider({ children }) {
  const { dark } = useTheme();

  return (
    <View style={{ flex: 1 }}>
        {children}
    </View>
  );
}
