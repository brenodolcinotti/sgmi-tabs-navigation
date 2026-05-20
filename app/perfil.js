import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supervisor Logado</Text>
      <Text style={styles.text}>Nome: Breno Dolcinotti</Text>
      <Text style={styles.text}>Matrícula: SENAI-SP</Text>
      <Text style={styles.text}>Setor: Análise e Desenvolvimento de Sistemas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#005499', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5, color: '#333' }
});