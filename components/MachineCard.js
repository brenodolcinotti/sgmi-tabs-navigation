import React from 'react';
import { View, Text, Switch, ActivityIndicator, StyleSheet } from 'react-native';

export default function MachineCard({ name, isOperating, onToggle }) {
  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle}>{name}</Text>
      </View>
      
      <Text style={isOperating ? styles.statusTextOnline : styles.statusTextOffline}>
        {isOperating ? 'OPERANDO' : 'DESLIGADO'}
      </Text>
      
      {isOperating ? (
        <ActivityIndicator size="large" color="#28a745" />
      ) : (
        <View style={{ height: 36 }} />
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Switch</Text>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#a3c2c2' }}
          thumbColor={isOperating ? '#28a745' : '#f4f3f4'}
          onValueChange={onToggle}
          value={isOperating}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#ffffff', width: '48%', padding: 15, borderRadius: 8, 
    marginBottom: 15, alignItems: 'center', justifyContent: 'space-between', 
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, 
    shadowOffset: { width: 0, height: 2 } 
  },
  titleContainer: {
    minHeight: 42, justifyContent: 'flex-start', marginBottom: 8, width: '100%',
  },
  cardTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#000' },
  statusTextOnline: { color: '#28a745', fontSize: 12, marginBottom: 10, fontWeight: '600' },
  statusTextOffline: { color: '#dc3545', fontSize: 12, marginBottom: 10, fontWeight: '600' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 15 },
  switchLabel: { fontSize: 14, color: '#000' },
});