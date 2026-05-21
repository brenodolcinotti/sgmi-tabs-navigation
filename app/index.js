import React, { useState } from 'react';
import { 
  View, Text, ScrollView, StyleSheet, Modal, 
  TextInput, TouchableOpacity, TouchableWithoutFeedback, 
  Keyboard, Switch, ActivityIndicator 
} from 'react-native';

function MachineCard({ name, isOperating, onToggle }) {
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

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMachineName, setAlertMachineName] = useState('');
  const [observacao, setObservacao] = useState('');

  const [machines, setMachines] = useState([
    { id: '1', name: 'Torno CNC - T01', isOperating: true },
    { id: '2', name: 'Fresa Industrial - F03', isOperating: true },
    { id: '3', name: 'Fiasa Industrial - F02', isOperating: true },
    { id: '4', name: 'Liso Industrial - F05', isOperating: true },
  ]);

  const toggleMachine = (id) => {
    const updateList = machines.map(machine => {
      if (machine.id === id) {
        const newState = !machine.isOperating;
        if (id === '1' && newState === false) {
          setAlertMachineName(machine.name);
          setModalVisible(true);
        }
        return { ...machine, isOperating: newState };
      }
      return machine;
    });
    setMachines(updateList);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>SETOR: USINAGEM</Text>
        <View style={styles.grid}>
          {machines.map(machine => (
            <MachineCard 
              key={machine.id} 
              name={machine.name} 
              isOperating={machine.isOperating} 
              onToggle={() => toggleMachine(machine.id)} 
            />
          ))}
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.modalTitle}>ALERTA DE MANUTENÇÃO</Text>
              <Text style={styles.modalDescription}>Máquina {alertMachineName} requer inspeção preventiva.</Text>
              
              <TextInput 
                style={styles.modalInput} 
                value={observacao} 
                onChangeText={setObservacao} 
                placeholder="Insira as observações..." 
              />
              
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.btnConfirm} onPress={() => setModalVisible(false)}>
                  <Text style={styles.btnText}>CONFIRMAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnIgnore} onPress={() => setModalVisible(false)}>
                  <Text style={styles.btnText}>IGNORAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 15 },
  sectionTitle: { fontSize: 18, color: '#333', marginBottom: 10, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: '#ffffff', width: '48%', padding: 15, borderRadius: 8, marginBottom: 15, alignItems: 'center', justifyContent: 'space-between', elevation: 3 },
  titleContainer: { minHeight: 42, justifyContent: 'flex-start', marginBottom: 8, width: '100%' },
  cardTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#000' },
  statusTextOnline: { color: '#28a745', fontSize: 12, marginBottom: 10, fontWeight: '600' },
  statusTextOffline: { color: '#dc3545', fontSize: 12, marginBottom: 10, fontWeight: '600' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 15 },
  switchLabel: { fontSize: 14, color: '#000' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#ffffff', borderRadius: 12, padding: 20, alignItems: 'center' },
  warningIcon: { fontSize: 50, marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  modalDescription: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  modalInput: { width: '100%', borderWidth: 1, borderColor: '#005499', borderRadius: 8, padding: 10, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  btnConfirm: { backgroundColor: '#005499', paddingVertical: 12, borderRadius: 6, flex: 1, marginRight: 10, alignItems: 'center' },
  btnIgnore: { backgroundColor: '#888888', paddingVertical: 12, borderRadius: 6, flex: 0.8, alignItems: 'center' },
  btnText: { color: '#ffffff', fontWeight: 'bold' }
});