import { View, Text, StyleSheet } from 'react-native'; // [cite: 377]

export default function Settings() { // [cite: 378]
  return (
    <View style={styles.container}> {/* [cite: 380] */}
      <Text style={styles.text}>Esta é a Aba de Configurações</Text> {/* [cite: 381] */}
    </View>
  );
}

const styles = StyleSheet.create({ // [cite: 383]
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0' // [cite: 384, 385]
  },
  text: { 
    fontSize: 16 // [cite: 386]
  }
});