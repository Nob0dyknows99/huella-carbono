import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CustomSelect({ label, selected, onSelect, options, style = {} }) {
  const { dark } = useTheme();
  const [visible, setVisible] = useState(false);

  const themeStyles = dark ? styles.dark : styles.light;
  const textColor = dark ? styles.textLight : styles.textDark;

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={[styles.label, textColor]}>{label}</Text>
      <TouchableOpacity
        style={[styles.selectBox, themeStyles]}
        onPress={() => setVisible(true)}
      >
        <Text style={textColor}>{options.find(opt => opt.value === selected)?.label}</Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={[styles.modal, themeStyles]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={textColor}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  selectBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  modal: {
    backgroundColor: '#fff',
    margin: 40,
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  light: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  dark: {
    backgroundColor: '#1f1f1f',
    borderColor: '#555',
  },
  textLight: {
    color: '#fff',
  },
  textDark: {
    color: '#000',
  },
});
